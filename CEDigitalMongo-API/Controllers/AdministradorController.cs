using CEDigitalMongo_API.Data;
using CEDigitalMongo_API.Modelos;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace CEDigitalMongo_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministradorController : ControllerBase
    {
        private readonly IMongoCollection<Administrador> _administradores;

        public AdministradorController(MongoDbService mongoDbService)
        {
            _administradores = mongoDbService.Database.GetCollection<Administrador>("administrador");
        }

        // GET: api/administrador
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Administrador>>> Get()
        {
            var admins = await _administradores.Find(_ => true).ToListAsync();
            return Ok(admins);
        }

        // GET: api/administrador/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Administrador>> GetById(string id)
        {
            var admin = await _administradores.Find(a => a.Id == id).FirstOrDefaultAsync();
            return admin is not null ? Ok(admin) : NotFound("Administrador no encontrado.");
        }

        // POST: api/administrador
        [HttpPost]
        public async Task<ActionResult> Post(Administrador admin)
        {
            await _administradores.InsertOneAsync(admin);
            return CreatedAtAction(nameof(GetById), new { id = admin.Id }, admin);
        }

        // POST: api/administrador/validar
        [HttpPost("validar")]
        public async Task<ActionResult<Administrador>> ValidarAdministrador([FromBody] Administrador datos)
        {
            var filter = Builders<Administrador>.Filter.And(
                Builders<Administrador>.Filter.Eq(a => a.Email, datos.Email),
                Builders<Administrador>.Filter.Eq(a => a.Password, datos.Password)
            );

            var admin = await _administradores.Find(filter).FirstOrDefaultAsync();

            if (admin == null)
                return NotFound("Credenciales inválidas.");

            return Ok(admin);
        }

        // PUT: api/administrador/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(string id, Administrador admin)
        {
            admin.Id = id;

            var result = await _administradores.ReplaceOneAsync(
                a => a.Id == id,
                admin
            );

            if (result.MatchedCount == 0)
                return NotFound("Administrador no encontrado.");

            return NoContent();
        }

        // DELETE: api/administrador/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var result = await _administradores.DeleteOneAsync(a => a.Id == id);

            if (result.DeletedCount == 0)
                return NotFound("Administrador no encontrado.");

            return NoContent();
        }
    }
}
