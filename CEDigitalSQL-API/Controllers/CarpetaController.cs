using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Controllers
{
    [Route("ced/sql/[controller]")]
    [ApiController]
    public class CarpetaController : ControllerBase
    {
        private readonly GrupoContext _grupoContext;
        private readonly CarpetaContext _carpetaContext;

        public CarpetaController(GrupoContext grupoContext, CarpetaContext carpetaContext)
        {
            _grupoContext = grupoContext;
            _carpetaContext = carpetaContext;
        }

        // GET: ced/sql/carpeta/contenidos?idGrupo=1
        [HttpGet]
        [Route("contenidos")]
        public async Task<IActionResult> ObtenerContenidosPorGrupo(int idGrupo)
        {
            var grupo = await _grupoContext.Grupo.FindAsync(idGrupo);

            if (grupo == null)
                return NotFound("Grupo no encontrado.");

            var carpetas = await _carpetaContext.Carpeta
                .Where(c => c.IdGrupo == idGrupo)
                .ToListAsync();

            return Ok(carpetas);
        }

        // POST: ced/sql/carpeta/new
        [HttpPost]
        [Route("new")]
        public async Task<IActionResult> CrearCarpeta([FromBody] Carpeta carpeta)
        {
            var grupoExiste = await _grupoContext.Grupo
                .AnyAsync(g => g.IdGrupo == carpeta.IdGrupo);

            if (!grupoExiste)
                return NotFound("Grupo no encontrado.");

            await _carpetaContext.Carpeta.AddAsync(carpeta);
            await _carpetaContext.SaveChangesAsync();

            return Ok("Carpeta creada correctamente.");
        }

        // DELETE: ced/sql/carpeta/del/{id}
        [HttpDelete]
        [Route("del/{id}")]
        public async Task<IActionResult> EliminarCarpeta(int id)
        {
            var carpeta = await _carpetaContext.Carpeta.FindAsync(id);
            if (carpeta == null)
                return NotFound("Carpeta no encontrada.");

            _carpetaContext.Carpeta.Remove(carpeta);
            await _carpetaContext.SaveChangesAsync();

            return Ok("Carpeta eliminada correctamente.");
        }
    }
}
