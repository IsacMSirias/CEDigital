using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Controllers
{
    [Route("ced/sql/[controller]")]
    [ApiController]
    public class EvaluacionController : ControllerBase
    {
        private readonly EvaluacionContext _evaluacionContext;
        private readonly RubroContext _rubroContext;

        public EvaluacionController(EvaluacionContext evaluacionContext, RubroContext rubroContext)
        {
            _evaluacionContext = evaluacionContext;
            _rubroContext = rubroContext;
        }

        [HttpPost]
        [Route("new")]
        public async Task<IActionResult> CrearEvaluacion(Evaluacion evaluacion)
        {
            var rubroExiste = await _rubroContext.Rubro.AnyAsync(r => r.IdRubro == evaluacion.IdRubro);
            if (!rubroExiste)
                return NotFound("Rubro no encontrado.");

            await _evaluacionContext.Evaluacion.AddAsync(evaluacion);
            await _evaluacionContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> ListarEvaluacionesPorRubro(int idRubro)
        {
            var rubroExiste = await _rubroContext.Rubro.AnyAsync(r => r.IdRubro == idRubro);
            if (!rubroExiste)
                return NotFound("Rubro no encontrado.");

            var evaluaciones = await _evaluacionContext.Evaluacion
                .Where(e => e.IdRubro == idRubro)
                .ToListAsync();

            return Ok(evaluaciones);
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> VerEvaluacion(int id)
        {
            var evaluacion = await _evaluacionContext.Evaluacion.FindAsync(id);
            if (evaluacion == null)
                return NotFound();

            return Ok(evaluacion);
        }

        [HttpPut]
        [Route("edit")]
        public async Task<IActionResult> EditarEvaluacion(int id, Evaluacion actualizada)
        {
            var evaluacion = await _evaluacionContext.Evaluacion.FindAsync(id);
            if (evaluacion == null)
                return NotFound();

            // Actualizar campos
            evaluacion.NombreEvaluacion = actualizada.NombreEvaluacion;
            evaluacion.PesoEvaluacion = actualizada.PesoEvaluacion;
            evaluacion.EspecificacionEvaluacion = actualizada.EspecificacionEvaluacion;
            evaluacion.EstadoNotas = actualizada.EstadoNotas;
            evaluacion.EsGrupalEvaluacion = actualizada.EsGrupalEvaluacion;
            evaluacion.LimiteEntregaEvaluacion = actualizada.LimiteEntregaEvaluacion;
            evaluacion.IdRubro = actualizada.IdRubro;

            await _evaluacionContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("del")]
        public async Task<IActionResult> EliminarEvaluacion(int id)
        {
            var evaluacion = await _evaluacionContext.Evaluacion.FindAsync(id);
            if (evaluacion == null)
                return NotFound();

            _evaluacionContext.Evaluacion.Remove(evaluacion);
            await _evaluacionContext.SaveChangesAsync();

            return Ok();
        }
    }
}
