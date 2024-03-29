﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BaseDatos.Entidades
{
    public class Caja
    {
        [Key]
        public int IdCaja { get; set; }

        public string FechaTurno { get; set; }
        public float FondoCajaRecibido { get; set; }
        public float EgresoProvedoresDebito { get; set; }
        public float EgresoProvedoresEfectivo { get; set; }
        public float IngresoVentaEfectivo { get; set; }
        public float IngresoVentaDebito { get; set; }
        public float FondoCajaEntregado { get; set; }



        public int? IdDetalleCaja { get; set; }
        [ForeignKey("IdDetalleCaja")]
        public DetalleCaja? DetallesCaja { get; set; }
    }
}
