using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Controllers
{
    [Route("ced/sql/[controller]")]
    [ApiController]
    public class RubroController : ControllerBase
    {
        private readonly RubroContext _rubroContext;
        private readonly GrupoContext _grupoContext;

        public RubroController(RubroContext rubroContext, GrupoContext grupoContext)
        {
            _rubroContext = rubroContext;
            _grupoContext = grupoContext;
        }

        [HttpPost]
        [Route("new")]
        public async Task<IActionResult> CrearRubro(Rubro rubro)
        {
            var grupoExiste = await _grupoContext.Grupo.AnyAsync(g => g.IdGrupo == rubro.IdGrupo);
            if (!grupoExiste)
                return NotFound("Grupo no encontrado.");

            // Validar suma de porcentajes
            var porcentajeActual = await _rubroContext.Rubro
                .Where(r => r.IdGrupo == rubro.IdGrupo)
                .SumAsync(r => r.PorcentajeRubro);

            if (porcentajeActual + rubro.PorcentajeRubro > 100)
                return BadRequest("La suma de porcentajes no puede exceder el 100%.");

            await _rubroContext.Rubro.AddAsync(rubro);
            await _rubroContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> ListarRubrosPorGrupo(int idGrupo)
        {
            var grupoExiste = await _grupoContext.Grupo.AnyAsync(g => g.IdGrupo == idGrupo);
            if (!grupoExiste)
                return NotFound("Grupo no encontrado.");

            var rubros = await _rubroContext.Rubro
                .Where(r => r.IdGrupo == idGrupo)
                .ToListAsync();

            return Ok(rubros);
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> VerRubro(int id)
        {
            var rubro = await _rubroContext.Rubro.FindAsync(id);
            if (rubro == null)
                return NotFound();

            return Ok(rubro);
        }

        [HttpPut]
        [Route("edit")]
        public async Task<IActionResult> EditarRubro(int id, Rubro rubroActualizado)
        {
            var rubro = await _rubroContext.Rubro.FindAsync(id);
            if (rubro == null)
                return NotFound();

            // Validar suma nueva
            var porcentajeOtros = await _rubroContext.Rubro
                .Where(r => r.IdGrupo == rubroActualizado.IdGrupo && r.IdRubro != id)
                .SumAsync(r => r.PorcentajeRubro);

            if (porcentajeOtros + rubroActualizado.PorcentajeRubro > 100)
                return BadRequest("La suma de porcentajes no puede exceder el 100%.");

            rubro.NombreRubro = rubroActualizado.NombreRubro;
            rubro.PorcentajeRubro = rubroActualizado.PorcentajeRubro;
            rubro.IdGrupo = rubroActualizado.IdGrupo;

            await _rubroContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("del")]
        public async Task<IActionResult> EliminarRubro(int id)
        {
            var rubro = await _rubroContext.Rubro.FindAsync(id);
            if (rubro == null)
                return NotFound();

            _rubroContext.Rubro.Remove(rubro);
            await _rubroContext.SaveChangesAsync();

            return Ok();
        }
    }
}
