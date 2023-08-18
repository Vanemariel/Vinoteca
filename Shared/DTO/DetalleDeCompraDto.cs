using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class DetalleDeCompraDto
    {
        public int idCompra { get; set; }
        public int idProducto { get; set; }
        public int idDetalleCompra {get;set;}
        public string fechaCompra { get; set; }
        public string nombreUsuario { get; set; }
        public string nombreProducto { get; set; }
        public string nombreProveedores { get; set; }
        public bool efectivo { get; set; }
        public bool transferencia { get; set; }
        public int cantidad { get; set; }
        public float total { get; set; }
        public string numeroDeFactura { get; set; }
    }
}
