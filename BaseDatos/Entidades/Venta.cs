using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vinoteca.BaseDatos;
using Vinoteca.BaseDatos.Entidades;

namespace BaseDatos.Entidades
{
    public class Venta
    {
        [Key]
        public int IdVenta { get; set; }
        public string FechaVenta { get; set; }
        public string NumeroDeFactura { get; set; }
        public bool efectivo { get; set; }
        public bool transferencia { get; set; }
        public float Total { get; set; }
        public int cantidad { get; set; }
        public float precio { get; set; }
        public float precioVenta { get; set; }

        public int IdProducto { get; set; }
        [ForeignKey("IdProducto")]
        public Producto Producto { get; set; }

        public int IdUsuario { get; set; }
        [ForeignKey("IdUsuario")]
        public Usuario Usuario { get; set; }

        public int IdCliente { get; set; }
        [ForeignKey("IdCliente")]
        public Cliente Cliente { get; set; }

        [InverseProperty("Venta")]
        public List<DetalleDeVenta> DetalleDeVentas { get; set; }
    }
}