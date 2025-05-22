using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CEDigitalMongo_API.Modelos
{
    public class Profesor
    {
        [BsonId]
        [BsonElement("CedulaProfesor")]
        public long CedulaProfesor { get; set; }

        [BsonElement("NombreProfesor")]
        public string? NombreProfesor { get; set; }

        [BsonElement("CorreoProfesor")]
        public string CorreoProfesor { get; set; }

        [BsonElement("PasswordProfesor")]
        public string PasswordProfesor { get; set; }
    }
}
