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
            _estudiantes = mongoDbService.Database.GetCollection<Estudiante>("Estudiante");
        }

        // GET: api/estudiante
        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<Estudiante>>> Get()
        {
            var estudiantes = await _estudiantes.Find(_ => true).ToListAsync();
            return Ok(estudiantes);
        }

        // GET: api/estudiante/{id}
        [HttpGet]
        public async Task<ActionResult<Estudiante>> GetById(int carnet)
        {
            var estudiante = await _estudiantes.Find(e => e.CarnetEstudiante == carnet).FirstOrDefaultAsync();
            return estudiante is not null ? Ok(new
            {
                carnetEstudiante = estudiante.CarnetEstudiante,
                cedulaEstudiante = estudiante.CedulaEstudiante,
                nombreEstudiante = estudiante.NombreEstudiante,
                correoEstudiante = estudiante.CorreoEstudiante,
                telefonoEstudiante = estudiante.TelefonoEstudiante
            }) : NotFound("Estudiante no encontrado.");
        }

        // POST: api/estudiante
        [HttpPost]
        public async Task<ActionResult> Post(Estudiante estudiante)
        {
            await _estudiantes.InsertOneAsync(estudiante);
            return CreatedAtAction(nameof(GetById), new { id = estudiante.CarnetEstudiante }, estudiante);
        }

        // POST: api/estudiante/login
        [HttpGet("login")]
        public async Task<ActionResult<Estudiante>> ValidarEstudiante(string correo, string password)
        {
            var filter = Builders<Estudiante>.Filter.And(
                Builders<Estudiante>.Filter.Eq(e => e.CorreoEstudiante, correo),
                Builders<Estudiante>.Filter.Eq(e => e.ContraseñaEstudiante, password)
            );

            var estudiante = await _estudiantes.Find(filter).FirstOrDefaultAsync();

            if (estudiante == null)
                return NotFound();

            return Ok(estudiante);
        }

        // PUT: api/estudiante/{id}
        [HttpPut("edit")]
        public async Task<ActionResult> Update(int carnet, Estudiante estudiante)
        {
            estudiante.CarnetEstudiante = carnet;

            var result = await _estudiantes.ReplaceOneAsync(
                e => e.CarnetEstudiante == carnet,
                estudiante
            );  

            if (result.MatchedCount == 0)
                return NotFound("Estudiante no encontrado.");

            return NoContent();
        }

        // DELETE: api/estudiante/{id}
        [HttpDelete]
        public async Task<ActionResult> Delete(int carnet)
        {
            var result = await _estudiantes.DeleteOneAsync(e => e.CarnetEstudiante == carnet);

            if (result.DeletedCount == 0)
                return NotFound("Estudiante no encontrado.");

            return NoContent();
        }
    }
}
