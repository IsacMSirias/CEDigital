using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models;

public partial class Semestre
{
    [Key]
    public int IdSemestre { get; set; }

    public int AñoSemestre { get; set; }

    public string PeriodoSemestre { get; set; } = null!;

    public string EstadoSemestre { get; set; } = null!;
}
