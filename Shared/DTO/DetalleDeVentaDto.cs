using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class DetalleDeVentaDto
    {
        public int idVenta { get; set; }
        public int idProducto { get; set; }
        //nuevo acá ajoba
        public int idDetalleVenta { get; set; }
        public string fechaVenta { get; set; }
        public string nombreUsuario { get; set; }
        public string nombreProducto { get; set; }
        public string nombreCliente { get; set; }
        public bool efectivo { get; set; }
        public bool transferencia { get; set; }
        public int cantidad { get; set; }
        public float total { get; set; }
        public string numeroDeFactura { get; set; }
    }

}
