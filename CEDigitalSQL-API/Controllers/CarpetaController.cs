using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Controllers
{
    [Route("ced/sql/[controller]")]
    [ApiController]
    public class CarpetaController : ControllerBase
    {
        private readonly DbContext _grupoContext;
        private readonly DbContext _carpetaContext;

        public CarpetaController(DbContext grupoContext, DbContext carpetaContext)
        {
            _grupoContext = grupoContext;
            _carpetaContext = carpetaContext;
        }

        [HttpGet]
        [Route("contenidos")]

        public async Task<IActionResult> ObtenerContenidosPorGrupo(int idGrupo)
        {
            var grupo = await _grupoContext.Set<Grupo>().FindAsync(idGrupo);

            if (grupo == null)
                return NotFound("Grupo no encontrado.");

            var carpetas = await _carpetaContext.Set<Carpeta>()
                .Where(c => c.IdGrupo == idGrupo)
                .ToListAsync();

            return Ok(carpetas);
        }
    }
}
