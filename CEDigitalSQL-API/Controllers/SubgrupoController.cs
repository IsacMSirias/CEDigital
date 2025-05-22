using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Controllers
{
    [Route("ced/sql/[controller]")]
    [ApiController]
    public class SubgrupoController : ControllerBase
    {
        private readonly SubgrupoContext _subgrupoContext;
        private readonly EvaluacionContext _evaluacionContext;
        private readonly GrupoContext _grupoContext;

        public SubgrupoController(
            SubgrupoContext subgrupoContext,
            EvaluacionContext evaluacionContext,
            GrupoContext grupoContext)
        {
            _subgrupoContext = subgrupoContext;
            _evaluacionContext = evaluacionContext;
            _grupoContext = grupoContext;
        }

        // POST: ced/sql/subgrupo/new
        [HttpPost]
        [Route("new")]
        public async Task<IActionResult> CrearSubgrupo(Subgrupo subgrupo)
        {
            var evalExiste = await _evaluacionContext.Evaluacion.AnyAsync(e => e.IdEvaluacion == subgrupo.IdEvaluacion);
            var grupoExiste = await _grupoContext.Grupo.AnyAsync(g => g.IdGrupo == subgrupo.IdGrupo);

            if (!evalExiste) return NotFound("Evaluación no encontrada.");
            if (!grupoExiste) return NotFound("Grupo no encontrado.");

            await _subgrupoContext.Subgrupo.AddAsync(subgrupo);
            await _subgrupoContext.SaveChangesAsync();
            return Ok();
        }

        // GET: ced/sql/subgrupo/list
        [HttpGet]
        [Route("list")]
        public async Task<ActionResult<IEnumerable<Subgrupo>>> ListarSubgrupos()
        {
            var subgrupos = await _subgrupoContext.Subgrupo.ToListAsync();
            return Ok(subgrupos);
        }

        // GET: ced/sql/subgrupo/get?id=1
        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> VerSubgrupo(int id)
        {
            var subgrupo = await _subgrupoContext.Subgrupo.FindAsync(id);
            return subgrupo is not null ? Ok(subgrupo) : NotFound();
        }

        // PUT: ced/sql/subgrupo/edit
        [HttpPut]
        [Route("edit")]
        public async Task<IActionResult> EditarSubgrupo(int id, Subgrupo actualizado)
        {
            var subgrupo = await _subgrupoContext.Subgrupo.FindAsync(id);
            if (subgrupo == null)
                return NotFound();

            subgrupo.NombreSubgrupo = actualizado.NombreSubgrupo;
            subgrupo.IdEvaluacion = actualizado.IdEvaluacion;
            subgrupo.IdGrupo = actualizado.IdGrupo;

            await _subgrupoContext.SaveChangesAsync();
            return Ok();
        }

        // DELETE: ced/sql/subgrupo/del?id=1
        [HttpDelete]
        [Route("del")]
        public async Task<IActionResult> EliminarSubgrupo(int id)
        {
            var subgrupo = await _subgrupoContext.Subgrupo.FindAsync(id);
            if (subgrupo == null)
                return NotFound();

            _subgrupoContext.Subgrupo.Remove(subgrupo);
            await _subgrupoContext.SaveChangesAsync();
            return Ok();
        }

        // GET: ced/sql/subgrupo/evaluacion?idEvaluacion=1
        [HttpGet]
        [Route("evaluacion")]
        public async Task<IActionResult> SubgruposPorEvaluacion(int idEvaluacion)
        {
            var evaluacionExiste = await _evaluacionContext.Evaluacion.AnyAsync(e => e.IdEvaluacion == idEvaluacion);
            if (!evaluacionExiste)
                return NotFound("Evaluación no encontrada.");

            var subgrupos = await _subgrupoContext.Subgrupo
                .Where(s => s.IdEvaluacion == idEvaluacion)
                .ToListAsync();

            return Ok(subgrupos);
        }
    }
}
