using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models
{

    public class Grupo
    {
        [Key]
        public int IdGrupo { get; set; }

        public int NumeroGrupo { get; set; }

        public int IdSemestre { get; set; }

        public int IdCurso { get; set; }
    }


}




