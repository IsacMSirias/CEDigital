using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Controllers
{
    [Route("ced/sql/[controller]")]
    [ApiController]
    public class ProfesorGrupoController : ControllerBase
    {
        private readonly ProfesorGrupoContext _context;
        private readonly GrupoContext _grupoContext;
        private readonly CursoContext _cursoContext;

        public ProfesorGrupoController(ProfesorGrupoContext context, GrupoContext grupoContext, CursoContext cursoContext)
        {
            _context = context;
            _grupoContext = grupoContext;
            _cursoContext = cursoContext;
        }

        [HttpGet]
        [Route("cursos-profesor")]
        public async Task<IActionResult> GetCursosPorProfesor([FromQuery] int cedula)
        {
            if (cedula <= 0)
                return BadRequest("Cédula inválida.");

            // 1. Obtener los ID de grupos del profesor
            var gruposAsignados = await _context.ProfesorGrupo
                .Where(pg => pg.CedulaProfesor == cedula)
                .Select(pg => pg.IdGrupo)
                .ToListAsync();

            if (!gruposAsignados.Any())
                return NotFound("No hay grupos asignados al profesor.");

            // 2. Obtener los datos de los grupos
            var grupos = await _grupoContext.Grupo
                .Where(g => gruposAsignados.Contains(g.IdGrupo))
                .ToListAsync();

            // 3. Obtener todos los cursos asociados a esos grupos
            var cursoIds = grupos.Select(g => g.IdCurso).Distinct().ToList();
            var cursos = await _cursoContext.Curso
                .Where(c => cursoIds.Contains(c.IdCurso))
                .ToListAsync();

            // 4. Construir la respuesta incluyendo grupo + curso
            var resultado = grupos.Select(grupo =>
            {
                var curso = cursos.FirstOrDefault(c => c.IdCurso == grupo.IdCurso);
                return new
                {
                    idGrupo = grupo.IdGrupo,
                    numeroGrupo = grupo.NumeroGrupo,
                    idCurso = grupo.IdCurso,
                    idSemestre = grupo.IdSemestre,
                    nombreCurso = curso?.NombreCurso ?? "Curso desconocido"
                };
            }).ToList();

            return Ok(resultado);
        }


    }
}
