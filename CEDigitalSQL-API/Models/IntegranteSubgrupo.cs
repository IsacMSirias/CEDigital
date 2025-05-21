using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models
{

    public class IntegranteSubgrupo
    {
        [Key]
        public int IdSubgrupo { get; set; }

        public required int CarnetEstudiante { get; set; }
    }


}




