using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models
{

    public class Entregable
    {
        [Key]
        public int IdEntregable { get; set; }

        public int NotaEntregable { get; set; }

        public string ObservacionesEntregable { get; set; }

        public int IdArchivoDesglose { get; set; }

        public int IdArchivoEntrega { get; set; }

        public int IdEvaluacion { get; set; }

        public int CarnetEstudiante { get; set; }
    }


}




