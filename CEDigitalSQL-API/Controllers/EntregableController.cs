using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Controllers
{
    [Route("ced/sql/[controller]")]
    [ApiController]
    public class EntregableController : ControllerBase
    {
        private readonly EntregableContext _entregableContext;
        private readonly EvaluacionContext _evaluacionContext;

        public EntregableController(EntregableContext entregableContext, EvaluacionContext evaluacionContext)
        {
            _entregableContext = entregableContext;
            _evaluacionContext = evaluacionContext;
        }

        [HttpPost]
        [Route("new")]
        public async Task<IActionResult> CrearEntregable(Entregable entregable)
        {
            var evaluacionExiste = await _evaluacionContext.Evaluacion.AnyAsync(e => e.IdEvaluacion == entregable.IdEvaluacion);
            if (!evaluacionExiste)
                return NotFound("Evaluación no encontrada.");

            await _entregableContext.Entregable.AddAsync(entregable);
            await _entregableContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> ListarEntregablesPorEvaluacion(int idEvaluacion)
        {
            var evaluacionExiste = await _evaluacionContext.Evaluacion.AnyAsync(e => e.IdEvaluacion == idEvaluacion);
            if (!evaluacionExiste)
                return NotFound("Evaluación no encontrada.");

            var entregables = await _entregableContext.Entregable
                .Where(e => e.IdEvaluacion == idEvaluacion)
                .ToListAsync();

            return Ok(entregables);
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> VerEntregable(int id)
        {
            var entregable = await _entregableContext.Entregable.FindAsync(id);
            if (entregable == null)
                return NotFound();

            return Ok(entregable);
        }

        [HttpPut]
        [Route("edit")]
        public async Task<IActionResult> EditarEntregable(int id, Entregable actualizado)
        {
            var entregable = await _entregableContext.Entregable.FindAsync(id);
            if (entregable == null)
                return NotFound();

            entregable.NotaEntregable = actualizado.NotaEntregable;
            entregable.ObservacionesEntregable = actualizado.ObservacionesEntregable;
            entregable.IdArchivoDesglose = actualizado.IdArchivoDesglose;
            entregable.IdArchivoEntrega = actualizado.IdArchivoEntrega;
            entregable.IdEvaluacion = actualizado.IdEvaluacion;

            await _entregableContext.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        [Route("student-eval")]
        public async Task<IActionResult> ObtenerEntregablePorEstudianteYEvaluacion(int carnet, int evaluacion)
        {
            var entregable = await _entregableContext.Entregable
                .FirstOrDefaultAsync(e => e.CarnetEstudiante == carnet && e.IdEvaluacion == evaluacion);

            if (entregable == null)
                return NotFound("Entregable no encontrado para el estudiante y evaluación especificados.");

            return Ok(entregable);
        }

        [HttpPut]
        [Route("set-nota")]
        public async Task<IActionResult> AsignarNota(int id, int notaEntregable, string? observacionesEntregable)
        {
            var entregable = await _entregableContext.Entregable.FindAsync(id);
            if (entregable == null)
                return NotFound("Entregable no encontrado.");

            try
            {
                entregable.NotaEntregable = notaEntregable;
                if (!(observacionesEntregable is null))
                {
                    entregable.ObservacionesEntregable = observacionesEntregable;
                }

                await _entregableContext.SaveChangesAsync();
                return Ok(new { mensaje = "Nota actualizada correctamente." });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar la nota: {ex.Message}");
            }
        }



        [HttpDelete]
        [Route("del")]
        public async Task<IActionResult> EliminarEntregable(int id)
        {
            var entregable = await _entregableContext.Entregable.FindAsync(id);
            if (entregable == null)
                return NotFound();

            _entregableContext.Entregable.Remove(entregable);
            await _entregableContext.SaveChangesAsync();

            return Ok();
        }
    }
}
