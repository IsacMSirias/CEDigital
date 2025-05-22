using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models
{

    public class Archivo
    {
        [Key]
        public int IdArchivo { get; set; }

        public required DateTime FechaSubidaArchivo { get; set; }

        public required byte[] ContenidoArchivo { get; set; }

        public required int TamañoArchivo { get; set; }

        public int CarnetEstudiante { get; set; }

        public int CedulaProfesor { get; set; }

        public required int IdCarpeta { get; set; }
    }
}




