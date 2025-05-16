using CEDigitalMongo_API.Data;
using CEDigitalMongo_API.Modelos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace CEDigitalMongo_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudianteController : ControllerBase
    {
        private readonly IMongoCollection<Estudiante>? _estudiantes;

        public EstudianteController(MongoDbService mongoDbService)
        {
            _estudiantes = mongoDbService.Database?.GetCollection<Estudiante>("estudiante");
        }


        [HttpGet]
        public async Task<IEnumerable<Estudiante>> Get()
        {
            return await _estudiantes.Find(FilterDefinition<Estudiante>.Empty).ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Estudiante?>> GetById(string id)
        {
            var filter = Builders<Estudiante>.Filter.Eq(x => x.Id, id);
            var estudiante = await _estudiantes.Find(filter).FirstOrDefaultAsync();
            return estudiante is not null ? Ok(estudiante) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> Post(Estudiante estudiante)
        {

            await _estudiantes.InsertOneAsync(estudiante);
            return CreatedAtAction(nameof(GetById), new { id = estudiante.Id }, estudiante);

        }

        [HttpPut]

        public async Task<ActionResult> Update(string id, Estudiante estudiante)
        {
           var filter = Builders<Estudiante>.Filter.Eq(x => x.Id, id);
            //var update = Builders<Estudiante>.Update
            //    .Set(x => x.Nombre, estudiante.Nombre)
            //    .Set(x => x.email, estudiante.email)
            //    .Set(x => x.carnet, estudiante.carnet)
            //    .Set(x => x.cedula, estudiante.cedula);
            //var result = await _estudiantes.UpdateOneAsync(filter, update);
            //return result.IsAcknowledged ? NoContent() : NotFound();

            await _estudiantes.ReplaceOneAsync(filter, estudiante);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var filter = Builders<Estudiante>.Filter.Eq(x => x.Id, id);

            await _estudiantes.DeleteOneAsync(filter);
            return Ok();
        }   
    }
}
