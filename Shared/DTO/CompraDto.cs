using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class CompraDto
    {
        public string FechaCompra { get; set; }
        public bool FormaPago { get; set; }
        public float Total { get; set; }
        //public int NumeroDeFactura { get; set; }
        public int IdUsuario { get; set; }
        public int IdProveedor { get; set; }
        public int IdProducto { get; set; }
        public int cantidad { get; set; }
        public float precio { get; set; }
    }
}
