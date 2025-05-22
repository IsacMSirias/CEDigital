using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Controllers
{
    [Route("ced/sql/[controller]")]
    [ApiController]
    public class MatriculaController : ControllerBase
    {
        private readonly MatriculaContext _matriculaContext;
        private readonly EstudianteContext _estudianteContext;
        private readonly CursoContext _cursoContext;
        private readonly GrupoContext _grupoContext;

        public MatriculaController(
            MatriculaContext matriculaContext,
            EstudianteContext estudianteContext,
            CursoContext cursoContext,
            GrupoContext grupoContext
        )
        {
            _matriculaContext = matriculaContext;
            _estudianteContext = estudianteContext;
            _cursoContext = cursoContext;
            _grupoContext = grupoContext;
        }

        // GET: ced/sql/matricula/cursos-estudiante?carnet=12345
        [HttpGet]
        [Route("cursos-estudiante")]
        public async Task<IActionResult> CursosPorEstudiante(int carnet)
        {
            var estudiante = await _estudianteContext.Estudiante.FindAsync(carnet);
            if (estudiante == null)
                return NotFound("Estudiante no encontrado.");

            // Paso 1: Obtener todos los IdGrupo del estudiante
            var gruposIds = await _matriculaContext.Matricula
                .Where(m => m.CarnetEstudiante == carnet)
                .Select(m => m.IdGrupo)
                .ToListAsync();

            // Paso 2: Obtener todos los IdCurso de esos grupos
            var cursosIds = await _grupoContext.Grupo
                .Where(g => gruposIds.Contains(g.IdGrupo))
                .Select(g => g.IdCurso)
                .ToListAsync();

            // Paso 3: Obtener los cursos
            var cursos = await _cursoContext.Curso
                .Where(c => cursosIds.Contains(c.IdCurso))
                .ToListAsync();

            return Ok(cursos);
        }

        // POST: ced/sql/matricula/new
        [HttpPost]
        [Route("new")]
        public async Task<IActionResult> MatricularEstudiante([FromBody] Matricula matricula)
        {
            // Validar existencia del estudiante
            var estudianteExiste = await _estudianteContext.Estudiante
                .AnyAsync(e => e.CarnetEstudiante == matricula.CarnetEstudiante);
            if (!estudianteExiste)
                return NotFound("Estudiante no encontrado.");

            // Validar existencia del grupo
            var grupoExiste = await _grupoContext.Grupo
                .AnyAsync(g => g.IdGrupo == matricula.IdGrupo);
            if (!grupoExiste)
                return NotFound("Grupo no encontrado.");

            // Validar que no esté ya matriculado
            var yaMatriculado = await _matriculaContext.Matricula
                .AnyAsync(m => m.CarnetEstudiante == matricula.CarnetEstudiante && m.IdGrupo == matricula.IdGrupo);
            if (yaMatriculado)
                return Conflict("El estudiante ya está matriculado en este grupo.");

            await _matriculaContext.Matricula.AddAsync(matricula);
            await _matriculaContext.SaveChangesAsync();

            return Ok("Estudiante matriculado con éxito.");
        }
    }
}
