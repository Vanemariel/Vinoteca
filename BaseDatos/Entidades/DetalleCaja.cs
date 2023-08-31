using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatos.Entidades
{
    public class DetalleCaja
    {
        [Key]
        public int IdDetalleCaja { get; set; }

        public int IdCaja { get; set; }
        [ForeignKey("IdCaja")]
        public Caja Caja { get; set; }


        [InverseProperty("IdVenta")]
        public List<Venta>? ListadoVentas { get; set; }


        [InverseProperty("IdCompra")]
        public List<Compra>? ListadoCompras { get; set; }
    }
}
