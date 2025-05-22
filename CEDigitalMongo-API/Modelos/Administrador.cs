using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CEDigitalMongo_API.Modelos
{
    public class Administrador
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? IdAdministrador { get; set; }

        [BsonElement("CorreoAdministrador")]
        public string? CorreoAdministrador { get; set; }

        [BsonElement("PasswordAdministrador")]
        public string? PasswordAdministrador { get; set; }
    }
}
