using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatos.Entidades
{
    public class Caja
    {
        [Key]
        public int IdCaja { get; set; }

        public string FechaTurno { get; set; }
        public float FondoCajaRecibido { get; set; }
        public float EgresoProvedores { get; set; }
        public float IngresoVentaEfectivo { get; set; }
        public float IngresoVentaDebito { get; set; }
        public float FondoCajaEntregado { get; set; }

    }
}
