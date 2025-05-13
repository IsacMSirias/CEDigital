using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CEDigitalSQL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursoController : ControllerBase
    {
        private readonly CursoContext _context;

        public CursoController(CursoContext context)
        {

            _context = context;
        }

        [HttpPost]
        [Route("crear")]
        public async Task<ActionResult> CrearCurso(Curso curso)
        {
            await _context.Curso.AddAsync(curso);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("list")]

        public async Task<ActionResult<IEnumerable<Curso>>> ListaCursos()
        {
            var cursos = await _context.Curso.ToListAsync();

            return Ok(cursos);
        }

        [HttpGet]
        [Route("ver")]

        public async Task<IActionResult> VerCurso(int id)
        {
            Curso curso = await _context.Curso.FindAsync(id);

            if (curso == null) { return NotFound(); }
            return Ok(curso);

        }

        [HttpPut]
        [Route("editar")]

        public async Task<IActionResult> UpdateCurso(int id, Curso curso)
        {
            var cursoExistente = await _context.Curso.FindAsync(id);
            
            cursoExistente!.NombreCurso = curso.NombreCurso;
            cursoExistente!.CreditosCurso = curso.CreditosCurso;
            cursoExistente!.IdEscuela = curso.IdEscuela;

            await _context.SaveChangesAsync();


            return Ok();

        }

        [HttpDelete]
        [Route("eliminar")]

        public async Task<IActionResult> EliminarCurso(int id)
        {
            var cursoEliminado = await _context.Curso.FindAsync(id);
            _context.Curso.Remove(cursoEliminado!);

            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
