using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models;

public partial class Curso
{
    [Key]
    public int IdCurso { get; set; }

    public required string NombreCurso { get; set; }

    public int CreditosCurso { get; set; }

    public int IdEscuela { get; set; }
}
