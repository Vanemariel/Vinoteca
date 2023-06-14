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
    public class Producto
    {
        [Key]
        public int IdProducto { get; set; }
        public string NombreProducto { get; set; }
        public int Stock { get; set; }
        public string Detalle { get; set; }
        public int PrecioVenta { get; set; }
        public int PrecioCompra { get; set; }

        public int IdProveedor { get; set; }

        [ForeignKey("IdProveedor")]
        public Proveedor Proveedor { get; set; }

        [InverseProperty("Producto")]
        public ICollection<DetalleDeCompra> DetallesCompra { get; set; }
    }
}