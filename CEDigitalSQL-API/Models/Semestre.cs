using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models
{

    public class Semestre
    {
        [Key]
        public int IdSemestre { get; set; }

        public int AñoSemestre { get; set; }

        public char PeriodoSemestre { get; set; }

        public char EstadoSemestre { get; set; }
    }


}




