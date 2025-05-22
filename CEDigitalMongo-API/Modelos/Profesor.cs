using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CEDigitalMongo_API.Modelos
{
    public class Profesor
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("nombreProfesor")]
        public string? Nombre { get; set; }

        [BsonElement("correoProfesor")]
        public string? Email { get; set; }

        [BsonElement("cedula")]
        public long Cedula { get; set; }

        [BsonElement("password")]
        public string? Password { get; set; }
    }
}
