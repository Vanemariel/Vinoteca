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
    public class DetalleDeCompra
    {
        [Key]
        public int IdDetalleCompra { get; set; }
        public int PrecioCompra { get; set; }
        public int CantidadCompra { get; set; }

        [ForeignKey("Compra")]
        public int IdCompra { get; set; }
        public Compra Compra { get; set; }

        [ForeignKey("Producto")]
        public int IdProducto { get; set; }
        public Producto Producto { get; set; }
    }
}
