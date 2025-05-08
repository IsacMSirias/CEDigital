using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models
{
    public class Curso
    {
        [Key]
        public int IdCurso { get; set; }

        [MaxLength(50, ErrorMessage = "Ingrese un nombre válido")]
        public string NombreCurso { get; set; } = string.Empty; // Cambiado de null a string.Empty por seguridad

        public int CreditosCurso { get; set; }

        public required string Escuela { get; set; }
    }
}

