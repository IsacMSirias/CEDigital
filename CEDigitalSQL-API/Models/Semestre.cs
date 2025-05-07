using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models
{

    public class Semestre
    {
        public int Id { get; set; }

        [MaxLength(50, ErrorMessage = "Ingrese un nombre válido")]
        public string NombreCurso { get; set; } = string.Empty; // Cambiado de null a string.Empty por seguridad

        public int Creditos { get; set; }

        public int Grupo { get; set; }
    }


}




