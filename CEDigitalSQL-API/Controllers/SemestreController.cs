using CEDigitalSQL_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Controllers
{
    [Route("ced/sql/[controller]")]
    [ApiController]
    public class SemestreController : ControllerBase
    {
        private readonly SemestreContext _context;

        public SemestreController(SemestreContext context)
        {
            _context = context;
        }

        // GET: ced/sql/Semestre/list
        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<Semestre>>> GetSemestres()
        {
            return await _context.Semestre.ToListAsync();
        }

        // GET: ced/sql/Semestre/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Semestre>> GetSemestre(int id)
        {
            var semestre = await _context.Semestre.FindAsync(id);
            if (semestre == null)
            {
                return NotFound("Semestre no encontrado.");
            }

            return semestre;
        }

        // POST: ced/sql/Semestre/new
        [HttpPost("new")]
        public async Task<ActionResult<Semestre>> PostSemestre(Semestre semestre)
        {
            _context.Semestre.Add(semestre);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSemestre), new { id = semestre.IdSemestre }, semestre);
        }

        // PUT: ced/sql/Semestre/update/5
        [HttpPut("update/{id}")]
        public async Task<IActionResult> PutSemestre(int id, Semestre semestre)
        {
            if (id != semestre.IdSemestre)
            {
                return BadRequest("El ID del semestre no coincide.");
            }

            _context.Entry(semestre).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SemestreExists(id))
                {
                    return NotFound("Semestre no encontrado.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: ced/sql/Semestre/delete/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteSemestre(int id)
        {
            var semestre = await _context.Semestre.FindAsync(id);
            if (semestre == null)
            {
                return NotFound("Semestre no encontrado.");
            }

            _context.Semestre.Remove(semestre);
            await _context.SaveChangesAsync();

            return Ok("Semestre eliminado correctamente.");
        }

        private bool SemestreExists(int id)
        {
            return _context.Semestre.Any(s => s.IdSemestre == id);
        }
    }
}
