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
            _profesores = mongoDbService.Database.GetCollection<Profesor>("Profesor");
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
        public async Task<ActionResult<Profesor>> GetById(int cedulaProfesor)
        {
            var profesor = await _profesores.Find(p => p.CedulaProfesor == cedulaProfesor).FirstOrDefaultAsync();
            return profesor is not null ? Ok(profesor) : NotFound("Profesor no encontrado.");
        }

        // POST: api/profesor
        [HttpPost]
        public async Task<ActionResult> Post(Profesor profesor)
        {
            await _profesores.InsertOneAsync(profesor);
            return CreatedAtAction(nameof(GetById), new { id = profesor.CedulaProfesor }, profesor);
        }

        // POST: api/profesor/login
        [HttpPost("login")]
        public async Task<ActionResult<Profesor>> ValidarProfesor(string correo, string password)
        {
            var filter = Builders<Profesor>.Filter.And(
                Builders<Profesor>.Filter.Eq(p => p.CorreoProfesor, correo),
                Builders<Profesor>.Filter.Eq(p => p.PasswordProfesor, password)
            );

            var profesor = await _profesores.Find(filter).FirstOrDefaultAsync();

            if (profesor == null)
                return NotFound("Los datos no coinciden con ningún profesor registrado.");

            return Ok(profesor);
        }

        // PUT: api/profesor/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int cedulaProfesor, Profesor profesor)
        {
            profesor.CedulaProfesor = cedulaProfesor;

            var result = await _profesores.ReplaceOneAsync(
                p => p.CedulaProfesor == cedulaProfesor,
                profesor
            );

            if (result.MatchedCount == 0)
                return NotFound("Profesor no encontrado.");

            return NoContent();
        }

        // DELETE: api/profesor/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int cedulaProfesor)
        {
            var result = await _profesores.DeleteOneAsync(p => p.CedulaProfesor == cedulaProfesor);

            if (result.DeletedCount == 0)
                return NotFound("Profesor no encontrado.");

            return NoContent();
        }
    }
}
