using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Controllers
{
    [Route("ced/sql/[controller]")]
    [ApiController]
    public class ArchivoController : ControllerBase
    {
        private readonly ArchivoContext _archivoContext;
        private readonly CarpetaContext _carpetaContext;

        public ArchivoController(ArchivoContext archivoContext, CarpetaContext carpetaContext)
        {
            _archivoContext = archivoContext;
            _carpetaContext = carpetaContext;
        }

        // GET: ced/sql/Archivo/listar?idCarpeta=1
        [HttpGet]
        [Route("listar")]
        [ProducesResponseType(typeof(IEnumerable<object>), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> ListarArchivosPorCarpeta(int idCarpeta)
        {
            if (idCarpeta <= 0)
                return BadRequest("ID de carpeta inválido.");

            var carpetaExiste = await _carpetaContext.Carpeta.AnyAsync(c => c.IdCarpeta == idCarpeta);
            if (!carpetaExiste)
                return NotFound("Carpeta no encontrada.");

            var archivos = await _archivoContext.Archivo
                .Where(a => a.IdCarpeta == idCarpeta)
                .Select(a => new
                {
                    idArchivo = a.IdArchivo,
                    contenidoArchivo = a.ContenidoArchivo,
                    fechaSubidaArchivo = a.FechaSubidaArchivo,
                    tamañoArchivo = a.TamañoArchivo,
                    carnetEstudiante = a.CarnetEstudiante,
                    cedulaProfesor = a.CedulaProfesor,
                    idCarpeta = a.IdCarpeta
                })
                .ToListAsync();

            return Ok(archivos);
        }

        // POST: ced/sql/Archivo/new
        [HttpPost]
        [Route("new")]
        public async Task<IActionResult> SubirArchivo([FromBody] Archivo archivo)
        {
            if (archivo == null)
                return BadRequest("Archivo no proporcionado.");

            if (archivo.ContenidoArchivo == null || archivo.ContenidoArchivo.Length == 0)
                return BadRequest("El contenido del archivo no puede estar vacío.");

            var carpetaExiste = await _carpetaContext.Carpeta.AnyAsync(c => c.IdCarpeta == archivo.IdCarpeta);
            if (!carpetaExiste)
                return NotFound("Carpeta no encontrada.");

            try
            {
                archivo.FechaSubidaArchivo = DateTime.UtcNow;

                await _archivoContext.Archivo.AddAsync(archivo);
                await _archivoContext.SaveChangesAsync();

                return Ok(new { mensaje = "Archivo subido correctamente", idArchivo = archivo.IdArchivo });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al procesar archivo: {ex.Message}");
            }
        }
    }
}
