using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models
{

    public class Profesor
    {
        [Key]
        public required int CedulaProfesor { get; set; }

        public required string NombreProfesor { get; set; }

        public required string CorreoProfesor { get; set; }

        public required string PasswordPassword { get; set; }
    }


}




