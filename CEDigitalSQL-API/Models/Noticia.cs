using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models
{

    public class Noticia
    {
        [Key]
        public int IdNoticia { get; set; }

        public required string TituloNoticia { get; set; }

        public required string MensajeNoticia { get; set; }

        public required DateTime FechaPublicacionNoticia { get; set; }

        public required int CedulaProfesor { get; set; }

        public required int IdGrupo { get; set; }
    }


}




