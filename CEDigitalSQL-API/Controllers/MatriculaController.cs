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
            // Verificar existencia del estudiante
            var estudiante = await _estudianteContext.Estudiante.FindAsync(carnet);
            if (estudiante == null)
                return NotFound("Estudiante no encontrado.");

            // Grupos del estudiante desde Matricula
            var gruposIds = await _matriculaContext.Matricula
                .Where(m => m.CarnetEstudiante == carnet)
                .Select(m => m.IdGrupo)
                .ToListAsync();

            if (!gruposIds.Any())
                return Ok(new List<object>());

            // Obtener los grupos desde GrupoContext
            var grupos = await _grupoContext.Grupo
                .Where(g => gruposIds.Contains(g.IdGrupo))
                .ToListAsync();

            if (!grupos.Any())
                return Ok(new List<object>());

            // Obtener los cursos desde CursoContext
            var cursosIds = grupos.Select(g => g.IdCurso).Distinct().ToList();

            var cursos = await _cursoContext.Curso
                .Where(c => cursosIds.Contains(c.IdCurso))
                .ToListAsync();

            // Respuesta final
            var resultado = grupos.Select(grupo =>
            {
                var curso = cursos.FirstOrDefault(c => c.IdCurso == grupo.IdCurso);
                return new
                {
                    IdGrupo = grupo.IdGrupo,
                    NombreCurso = curso?.NombreCurso ?? "Curso no encontrado",
                    NumeroGrupo = grupo.NumeroGrupo,
                    IdSemestre = grupo.IdSemestre
                };
            }).ToList();

            return Ok(resultado);
        }

        // GET: ced/sql/matricula/list?idGrupo=1
        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> ListarEstudiantesPorGrupo(int idGrupo)
        {
            var grupoExiste = await _grupoContext.Grupo.AnyAsync(g => g.IdGrupo == idGrupo);
            if (!grupoExiste)
                return NotFound("Grupo no encontrado.");

            var estudiantes = await _matriculaContext.Matricula
                .Where(m => m.IdGrupo == idGrupo)
                .Select(m => new { CarnetEstudiante = m.CarnetEstudiante })
                .ToListAsync();

            return Ok(estudiantes);
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
