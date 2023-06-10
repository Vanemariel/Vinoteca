using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vinoteca.BaseDatos;

namespace BaseDatos.Entidades
{
    public class DetalleDeVenta
    {
        [Key]
        public int IdDetalleVenta { get; set; }
        public int PrecioVenta { get; set; }
        public int CantidadVenta { get; set; }

        [ForeignKey("Venta")]
        public int IdVenta { get; set; }
        public Venta Venta { get; set; }

        [ForeignKey("Producto")]
        public int IdProducto { get; set; }
        public Producto Producto { get; set; }

    }
}