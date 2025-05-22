using CEDigitalMongo_API.Data;
using CEDigitalMongo_API.Modelos;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace CEDigitalMongo_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfesorController : ControllerBase
    {
        private readonly IMongoCollection<Profesor> _profesores;

        public ProfesorController(MongoDbService mongoDbService)
        {
            _profesores = mongoDbService.Database.GetCollection<Profesor>("profesor");
        }

        // GET: api/profesor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profesor>>> Get()
        {
            var profesores = await _profesores.Find(_ => true).ToListAsync();
            return Ok(profesores);
        }

        // GET: api/profesor/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Profesor>> GetById(string id)
        {
            var profesor = await _profesores.Find(p => p.Id == id).FirstOrDefaultAsync();
            return profesor is not null ? Ok(profesor) : NotFound("Profesor no encontrado.");
        }

        // POST: api/profesor
        [HttpPost]
        public async Task<ActionResult> Post(Profesor profesor)
        {
            await _profesores.InsertOneAsync(profesor);
            return CreatedAtAction(nameof(GetById), new { id = profesor.Id }, profesor);
        }

        // POST: api/profesor/validar
        [HttpPost("validar")]
        public async Task<ActionResult<Profesor>> ValidarProfesor([FromBody] Profesor datos)
        {
            var filter = Builders<Profesor>.Filter.And(
                Builders<Profesor>.Filter.Eq(p => p.Nombre, datos.Nombre),
                Builders<Profesor>.Filter.Eq(p => p.Email, datos.Email),
                Builders<Profesor>.Filter.Eq(p => p.Cedula, datos.Cedula),
                Builders<Profesor>.Filter.Eq(p => p.Password, datos.Password)
            );

            var profesor = await _profesores.Find(filter).FirstOrDefaultAsync();

            if (profesor == null)
                return NotFound("Los datos no coinciden con ningún profesor registrado.");

            return Ok(profesor);
        }

        // PUT: api/profesor/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(string id, Profesor profesor)
        {
            profesor.Id = id;

            var result = await _profesores.ReplaceOneAsync(
                p => p.Id == id,
                profesor
            );

            if (result.MatchedCount == 0)
                return NotFound("Profesor no encontrado.");

            return NoContent();
        }

        // DELETE: api/profesor/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var result = await _profesores.DeleteOneAsync(p => p.Id == id);

            if (result.DeletedCount == 0)
                return NotFound("Profesor no encontrado.");

            return NoContent();
        }
    }
}
