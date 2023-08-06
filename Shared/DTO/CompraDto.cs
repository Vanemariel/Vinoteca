using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class CompraDto
    {
        public string fechaCompra { get; set; }
        public string numeroDeFactura { get; set; }
        public bool efectivo { get; set; }
        public bool transferencia { get; set; }
        public float totalCompra { get; set; }
        public int idUsuario { get; set; }
        public int idProveedor { get; set; }


        public List<ProductoDTOUltraNOOficial> listaProductos { get; set; }
    }

    public class ProductoDTOUltraNOOficial
    { // Esto viene del front en el metodo validate() de ListVentas.tsx, linea 288 aprox
        public int idProducto { get; set; }
        public int cantidad { get; set; }
        public float total { get; set; }
    }
}

