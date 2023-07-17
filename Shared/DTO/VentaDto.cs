using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class VentaDto
    {
        public string FechaVenta { get; set; }
        public string NumeroDeFactura { get; set; }
        public bool efectivo { get; set; }
        public bool transferencia { get; set; }
        public float Total { get; set; }
        public int IdUsuario { get; set; }
        public int IdCliente { get; set; }
        public int cantidad { get; set; }
        public float precio { get; set; }
        public float precioVenta { get; set; }
        public int IdProducto { get; set; }
    }
}
