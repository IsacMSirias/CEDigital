using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models
{

    public class Subgrupo
    {
        [Key]
        public int IdSubgrupo { get; set; }

        public required string NombreSubgrupo { get; set; }

        public required int IdEvaluacion { get; set; }

        public required int IdGrupo { get; set; }
    }


}




