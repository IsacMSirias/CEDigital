using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models
{

    public class Rubro
    {
        [Key]
        public int IdRubro { get; set; }

        public required string NombreRubro { get; set; }

        public required int PorcentajeRubro { get; set; }

        public required int IdGrupo { get; set; }
    }


}




