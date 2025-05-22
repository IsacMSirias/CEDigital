using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CEDigitalSQL_API.Controllers
{
    [Route("ced/sql/[controller]")]
    [ApiController]
    public class EstudianteController : ControllerBase
    {
        private readonly EstudianteContext _context;

        public EstudianteController(EstudianteContext context)
        {

            _context = context;
        }

        [HttpPost]
        [Route("new")]
        public async Task<ActionResult> CrearEstudiante(Estudiante estudiante)
        {
            await _context.Estudiante.AddAsync(estudiante);
            await _context.SaveChangesAsync();

            return Ok(new { id = estudiante.CarnetEstudiante });
        }

        [HttpGet]
        [Route("list")]

        public async Task<ActionResult<IEnumerable<Estudiante>>> ListaEstudiantes()
        {
            var estudiantes = await _context.Estudiante.ToListAsync();

            return Ok(estudiantes);
        }

        [HttpGet]
        [Route("get")]

        public async Task<IActionResult> VerEstudiante(int CarnetEstudiante)
        {
            Estudiante estudiante = await _context.Estudiante.FindAsync(CarnetEstudiante);

            if (estudiante == null) { return NotFound(); }
            return Ok(estudiante);

        }

        //[HttpPut]
        //[Route("edit")]

        //public async Task<IActionResult> UpdateCurso(int id, Curso curso)
        //{
        //    var cursoExistente = await _context.Curso.FindAsync(id);
            
        //    cursoExistente!.NombreCurso = curso.NombreCurso;
        //    cursoExistente!.CreditosCurso = curso.CreditosCurso;
        //    cursoExistente!.IdEscuela = curso.IdEscuela;

        //    await _context.SaveChangesAsync();


        //    return Ok();

        //}

        [HttpDelete]
        [Route("del")]

        public async Task<IActionResult> EliminarEstudiante(int CarnetEstudiante)
        {
            var estudianteEliminado = await _context.Estudiante.FindAsync(CarnetEstudiante);
            _context.Estudiante.Remove(estudianteEliminado!);

            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
