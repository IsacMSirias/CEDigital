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
        private readonly DbContext _grupoContext;

        public MatriculaController(
            MatriculaContext matriculaContext,
            EstudianteContext estudianteContext,
            CursoContext cursoContext,
            DbContext grupoContext // Reemplaza con tu contexto real de Grupo
        )
        {
            _matriculaContext = matriculaContext;
            _estudianteContext = estudianteContext;
            _cursoContext = cursoContext;
            _grupoContext = grupoContext;
        }

        [HttpGet]
        [Route("cursos-estudiante")]

        public async Task<IActionResult> CursosPorEstudiante(int carnet)
        {
            var estudiante = await _estudianteContext.Estudiante.FindAsync(carnet);
            if (estudiante == null)
                return NotFound("Estudiante no encontrado.");

            // Se asume que Grupo tiene navegación a Curso
            var cursos = await _matriculaContext.Matricula
                .Where(m => m.CarnetEstudiante == carnet)
                .Join(_grupoContext.Set<Grupo>(),
                      matricula => matricula.IdGrupo,
                      grupo => grupo.IdGrupo,
                      (matricula, grupo) => grupo.IdCurso)
                .Join(_cursoContext.Curso,
                      idCurso => idCurso,
                      curso => curso.IdCurso,
                      (idCurso, curso) => curso)
                .ToListAsync();

            return Ok(cursos);
        }
    }
}
