using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Controllers
{
    [Route("ced/sql/[controller]")]
    [ApiController]
    public class GrupoController : ControllerBase
    {
        private readonly GrupoContext _grupoContext;

        public GrupoController(GrupoContext grupoContext)
        {
            _grupoContext = grupoContext;
        }

        [HttpPost]
        [Route("new")]
        public async Task<IActionResult> CrearGrupo(Grupo grupo)
        {
            await _grupoContext.Grupo.AddAsync(grupo);
            await _grupoContext.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> ListarGrupos()
        {
            var grupos = await _grupoContext.Grupo.ToListAsync();
            return Ok(grupos);
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> VerGrupo(int id)
        {
            var grupo = await _grupoContext.Grupo.FindAsync(id);
            if (grupo == null)
                return NotFound();

            return Ok(grupo);
        }

        [HttpDelete]
        [Route("del")]
        public async Task<IActionResult> EliminarGrupo(int id)
        {
            var grupo = await _grupoContext.Grupo.FindAsync(id);
            if (grupo == null)
                return NotFound();

            _grupoContext.Grupo.Remove(grupo);
            await _grupoContext.SaveChangesAsync();
            return Ok();
        }
    }
}