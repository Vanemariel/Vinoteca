using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class DetalleDeVentaDto
    {
        public float PrecioVenta { get; set; }
        public int CantidadVenta { get; set; }
        public int IdVenta { get; set; }
        public int IdProducto { get; set; }
    }
}
