using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models
{
    public class Evaluacion
    {
        [Key]
        public int IdEvaluacion { get; set; }

        public byte[] EspecificacionEvaluacion { get; set; }

        public required string NombreEvaluacion { get; set; }

        public required int PesoEvaluacion { get; set; }

        public bool EstadoNotas { get; set; } = false;

        public bool EsGrupalEvaluacion { get; set; }

        // ✅ Cambiado de DateTime a DateTime? para aceptar NULL
        public DateTime? LimiteEntregaEvaluacion { get; set; }

        public required int IdRubro { get; set; }
    }
}
