using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CEDigitalMongo_API.Modelos
{
    public class Estudiante
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("nombre"), BsonRepresentation(BsonType.String)]
        public string? Nombre { get; set; }

        [BsonElement("email"), BsonRepresentation(BsonType.String)]

        public string? email { get; set; }

        [BsonElement("carnet"), BsonRepresentation(BsonType.Int64)]

        public int carnet { get; set; }

        [BsonElement("cedula"), BsonRepresentation(BsonType.Int64)]
        public int cedula { get; set; }

    }
}
