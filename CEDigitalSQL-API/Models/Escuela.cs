using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CEDigitalSQL_API.Models;

public partial class Escuela
{
    [Key]
    public int IdEscuela { get; set; }

    public required string CodigoEscuela { get; set; }

    public required string NombreEscuela { get; set; }
}
