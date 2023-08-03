using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class VentaDto
    {
        public string fechaVenta { get; set; }
        public string numeroDeFactura { get; set; }
        public bool efectivo { get; set; }
        public bool transferencia { get; set; }
        public float totalVenta { get; set; }
        public int idUsuario { get; set; }
        //public int IdCliente { get; set; }
        public string nombreCliente { get; set; }

        public List<ProductoDTOUltraOficial> listaProductos { get; set; }
    }

    public class ProductoDTOUltraOficial
    { // Esto viene del front en el metodo validate() de ListVentas.tsx, linea 288 aprox
        public int idProducto { get; set; }
        public int cantidad { get; set; }
        public float total { get; set; }
    }

}
