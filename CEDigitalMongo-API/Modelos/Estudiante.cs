using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CEDigitalMongo_API.Modelos
{
    public class Estudiante
    {
        [BsonId]
        [BsonElement("CarnetEstudiante"), BsonRepresentation(BsonType.Int32)]
        public int CarnetEstudiante { get; set; }

        [BsonElement("NombreEstudiante"), BsonRepresentation(BsonType.String)]
        public string? NombreEstudiante { get; set; }

        [BsonElement("CorreoEstudiante"), BsonRepresentation(BsonType.String)]
        public string? CorreoEstudiante{ get; set; }

        [BsonElement("ContraseñaEstudiante"), BsonRepresentation(BsonType.String)]
        public string? ContraseñaEstudiante { get; set; }

        [BsonElement("CedulaEstudiante"), BsonRepresentation(BsonType.Int64)]
        public int CedulaEstudiante { get; set; }

        [BsonElement("TelefonoEstudiante"), BsonRepresentation(BsonType.Int64)]
        public int TelefonoEstudiante { get; set; }

    }
}
