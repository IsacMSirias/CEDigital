using CEDigitalMongo_API.Data;
using CEDigitalMongo_API.Modelos;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace CEDigitalMongo_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudianteController : ControllerBase
    {
        private readonly IMongoCollection<Estudiante> _estudiantes;

        public EstudianteController(MongoDbService mongoDbService)
        {
            _estudiantes = mongoDbService.Database.GetCollection<Estudiante>("estudiante");
        }

        // GET: api/estudiante
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Estudiante>>> Get()
        {
            var estudiantes = await _estudiantes.Find(_ => true).ToListAsync();
            return Ok(estudiantes);
        }

        // GET: api/estudiante/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Estudiante>> GetById(string id)
        {
            var estudiante = await _estudiantes.Find(e => e.Id == id).FirstOrDefaultAsync();
            return estudiante is not null ? Ok(estudiante) : NotFound("Estudiante no encontrado.");
        }

        // POST: api/estudiante
        [HttpPost]
        public async Task<ActionResult> Post(Estudiante estudiante)
        {
            await _estudiantes.InsertOneAsync(estudiante);
            return CreatedAtAction(nameof(GetById), new { id = estudiante.Id }, estudiante);
        }

        // POST: api/estudiante/validar
        [HttpPost("validar")]
        public async Task<ActionResult<Estudiante>> ValidarEstudiante([FromBody] Estudiante datos)
        {
            var filter = Builders<Estudiante>.Filter.And(
                Builders<Estudiante>.Filter.Eq(e => e.Nombre, datos.Nombre),
                Builders<Estudiante>.Filter.Eq(e => e.email, datos.email),
                Builders<Estudiante>.Filter.Eq(e => e.carnet, datos.carnet),
                Builders<Estudiante>.Filter.Eq(e => e.cedula, datos.cedula)
            );

            var estudiante = await _estudiantes.Find(filter).FirstOrDefaultAsync();

            if (estudiante == null)
                return NotFound("Los datos no coinciden con ningún estudiante registrado.");

            return Ok(estudiante);
        }

        // PUT: api/estudiante/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(string id, Estudiante estudiante)
        {
            estudiante.Id = id;

            var result = await _estudiantes.ReplaceOneAsync(
                e => e.Id == id,
                estudiante
            );

            if (result.MatchedCount == 0)
                return NotFound("Estudiante no encontrado.");

            return NoContent();
        }

        // DELETE: api/estudiante/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var result = await _estudiantes.DeleteOneAsync(e => e.Id == id);

            if (result.DeletedCount == 0)
                return NotFound("Estudiante no encontrado.");

            return NoContent();
        }
    }
}
