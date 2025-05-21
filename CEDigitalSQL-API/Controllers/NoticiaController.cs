using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Controllers
{
    [Route("ced/sql/[controller]")]
    [ApiController]
    public class NoticiaController : ControllerBase
    {
        private readonly NoticiaContext _noticiaContext;
        private readonly ProfesorContext _profesorContext;
        private readonly GrupoContext _grupoContext;

        public NoticiaController(
            NoticiaContext noticiaContext,
            ProfesorContext profesorContext,
            GrupoContext grupoContext)
        {
            _noticiaContext = noticiaContext;
            _profesorContext = profesorContext;
            _grupoContext = grupoContext;
        }

        [HttpPost]
        [Route("new")]
        public async Task<IActionResult> CrearNoticia(Noticia noticia)
        {
            var profesorExiste = await _profesorContext.Profesor
                .AnyAsync(p => p.CedulaProfesor == noticia.CedulaProfesor);
            if (!profesorExiste)
                return NotFound("Profesor no encontrado.");

            var grupoExiste = await _grupoContext.Grupo
                .AnyAsync(g => g.IdGrupo == noticia.IdGrupo);
            if (!grupoExiste)
                return NotFound("Grupo no encontrado.");

            await _noticiaContext.Noticia.AddAsync(noticia);
            await _noticiaContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> ListarNoticiasPorGrupo(int idGrupo)
        {
            var grupoExiste = await _grupoContext.Grupo
                .AnyAsync(g => g.IdGrupo == idGrupo);
            if (!grupoExiste)
                return NotFound("Grupo no encontrado.");

            var noticias = await _noticiaContext.Noticia
                .Where(n => n.IdGrupo == idGrupo)
                .OrderByDescending(n => n.FechaPublicacionNoticia)
                .ToListAsync();

            return Ok(noticias);
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> VerNoticia(int id)
        {
            var noticia = await _noticiaContext.Noticia.FindAsync(id);
            if (noticia == null)
                return NotFound();

            return Ok(noticia);
        }

        [HttpPut]
        [Route("edit")]
        public async Task<IActionResult> EditarNoticia(int id, Noticia actualizada)
        {
            var noticia = await _noticiaContext.Noticia.FindAsync(id);
            if (noticia == null)
                return NotFound();

            noticia.TituloNoticia = actualizada.TituloNoticia;
            noticia.MensajeNoticia = actualizada.MensajeNoticia;
            noticia.FechaPublicacionNoticia = actualizada.FechaPublicacionNoticia;
            noticia.CedulaProfesor = actualizada.CedulaProfesor;
            noticia.IdGrupo = actualizada.IdGrupo;

            await _noticiaContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("del")]
        public async Task<IActionResult> EliminarNoticia(int id)
        {
            var noticia = await _noticiaContext.Noticia.FindAsync(id);
            if (noticia == null)
                return NotFound();

            _noticiaContext.Noticia.Remove(noticia);
            await _noticiaContext.SaveChangesAsync();

            return Ok();
        }
    }
}
