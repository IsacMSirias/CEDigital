using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CEDigitalSQL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosController : ControllerBase
    {
        private readonly CursoContext _context;

        public CursosController(CursoContext context)
        {

            _context = context;
        }

        [HttpPost]
        [Route("crear")]
        public async Task<ActionResult> CrearCurso(Cursos curso)
        {
            await _context.Cursos.AddAsync(curso);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("list")]

        public async Task<ActionResult<IEnumerable<Cursos>>> ListaCursos()
        {
            var cursos = await _context.Cursos.ToListAsync();

            return Ok(cursos);
        }

        [HttpGet]
        [Route("ver")]

        public async Task<IActionResult> VerCurso(int id)
        {
            Cursos curso = await _context.Cursos.FindAsync(id);

            if (curso == null) { return NotFound(); }
            return Ok(curso);

        }

        [HttpPut]
        [Route("editar")]

        public async Task<IActionResult> UpdateCurso(int id, Cursos curso)
        {
            var cursoExistente = await _context.Cursos.FindAsync(id);
            
            cursoExistente!.NombreCurso = curso.NombreCurso;
            cursoExistente!.Creditos = curso.Creditos;
            cursoExistente!.Grupo = curso.Grupo;

            await _context.SaveChangesAsync();


            return Ok();

        }

        [HttpDelete]
        [Route("eliminar")]

        public async Task<IActionResult> EliminarCurso(int id)
        {
            var cursoEliminado = await _context.Cursos.FindAsync(id);
            _context.Cursos.Remove(cursoEliminado!);

            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
