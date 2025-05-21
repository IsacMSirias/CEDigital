using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Controllers
{
    [Route("ced/sql/[controller]")]
    [ApiController]
    public class DocumentosController : ControllerBase
    {
        private readonly CarpetaContext _carpetaContext;

        public DocumentosController(CarpetaContext carpetaContext)
        {
            _carpetaContext = carpetaContext;
        }

        // GET: ced/sql/documentos/por-grupo
        [HttpGet]
        [Route("por-grupo")]
        public async Task<IActionResult> VerDocumentosPorGrupo(int idGrupo)
        {
            // Busca las carpetas asociadas al grupo
            var carpetas = await _carpetaContext.Carpeta
                .Where(c => c.IdGrupo == idGrupo)
                .ToListAsync();

            if (carpetas == null || !carpetas.Any())
            {
                return NotFound("No se encontraron carpetas para este grupo.");
            }

            return Ok(carpetas);
        }
    }
}
