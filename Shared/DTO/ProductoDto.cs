using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class ProductoDto
    {
        public int IdProducto { get; set; } 
        public string NombreProducto { get; set; }
        public int Stock { get; set; }
        public string Detalle { get; set; }
        public float PrecioVenta { get; set; }
        public float PrecioCompra { get; set; }
        public int IdProveedor { get; set; }
    }
}
