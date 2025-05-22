using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Controllers
{
    [Route("ced/sql/[controller]")]
    [ApiController]
    public class EscuelaController : ControllerBase
    {
        private readonly EscuelaContext _escuelaContext;
        private readonly CursoContext _cursoContext;

        public EscuelaController(EscuelaContext escuelaContext, CursoContext cursoContext)
        {
            _escuelaContext = escuelaContext;
            _cursoContext = cursoContext;
        }

        // POST: ced/sql/escuela/new
        [HttpPost]
        [Route("new")]
        public async Task<IActionResult> CrearEscuela(Escuela escuela)
        {
            await _escuelaContext.Escuela.AddAsync(escuela);
            await _escuelaContext.SaveChangesAsync();
            return Ok();
        }

        // GET: ced/sql/escuela/list
        [HttpGet]
        [Route("list")]
        public async Task<ActionResult<IEnumerable<Escuela>>> ListarEscuelas()
        {
            var escuelas = await _escuelaContext.Escuela.ToListAsync();
            return Ok(escuelas);
        }

        // GET: ced/sql/escuela/get?id=1
        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> VerEscuela(int id)
        {
            var escuela = await _escuelaContext.Escuela.FindAsync(id);
            return escuela is not null ? Ok(escuela) : NotFound();
        }

        // PUT: ced/sql/escuela/edit
        [HttpPut]
        [Route("edit")]
        public async Task<IActionResult> EditarEscuela(int id, Escuela actualizada)
        {
            var escuela = await _escuelaContext.Escuela.FindAsync(id);
            if (escuela == null)
                return NotFound();

            escuela.NombreEscuela = actualizada.NombreEscuela;
            escuela.CodigoEscuela = actualizada.CodigoEscuela;

            await _escuelaContext.SaveChangesAsync();
            return Ok();
        }

        // DELETE: ced/sql/escuela/del?id=1
        [HttpDelete]
        [Route("del")]
        public async Task<IActionResult> EliminarEscuela(int id)
        {
            var escuela = await _escuelaContext.Escuela.FindAsync(id);
            if (escuela == null)
                return NotFound();

            _escuelaContext.Escuela.Remove(escuela);
            await _escuelaContext.SaveChangesAsync();
            return Ok();
        }

        // GET: ced/sql/escuela/cursos?idEscuela=1
        [HttpGet]
        [Route("cursos")]
        public async Task<IActionResult> VerCursosPorEscuela(int idEscuela)
        {
            var escuelaExiste = await _escuelaContext.Escuela.AnyAsync(e => e.IdEscuela == idEscuela);
            if (!escuelaExiste)
                return NotFound("Escuela no encontrada.");

            var cursos = await _cursoContext.Curso
                .Where(c => c.IdEscuela == idEscuela)
                .ToListAsync();

            return Ok(cursos);
        }
    }
}
