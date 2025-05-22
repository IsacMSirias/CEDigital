using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models
{

    public class Carpeta
    {
        [Key]
        public int IdCarpeta { get; set; }

        public required string RutaCarpeta { get; set; }

        public int CedulaProfesor { get; set; }

        public required int IdGrupo { get; set; }
    }


}




