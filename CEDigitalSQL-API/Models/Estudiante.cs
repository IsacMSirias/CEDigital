using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models
{

    public class Estudiante
    {
        [Key]
        public int CarnetEstudiante { get; set; }

        public required string NombreEstudiante { get; set; }

        public required int CedulaEstudiante { get; set; }

        public required string CorreoEstudiante { get; set; }

        public required string PasswordEstudiante { get; set; }

        public int TelefonoEstudiante { get; set; }
    }


}




