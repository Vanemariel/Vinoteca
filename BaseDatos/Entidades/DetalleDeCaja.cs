using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatos.Entidades
{
    public class DetalleDeCaja
    {
        [Key]
        public int IdDetalleCaja { get; set; }
        public float Importe { get; set; }
        public float Saldo { get; set; }

        [ForeignKey("Caja")]
        public int IdCaja { get; set; }
        public Caja Caja { get; set; }

        [ForeignKey("Compra")]
        public int? IdCompra { get; set; }
        public Compra Compra { get; set; }
    }
}
