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
    public class Compra
    {
        [Key]
        public int IdCompra { get; set; }
        public string FechaCompra { get; set; }
        public bool efectivo { get; set; }
        public bool transferencia { get; set; }
        public float Total { get; set; }
        //public int NumeroDeFactura { get; set; }
        public int cantidad {get; set;}
        public float precio { get; set; }
        public int IdUsuario { get; set; }
        public int IdProducto { get; set; }

        [ForeignKey("IdProducto")]
        public Usuario Producto { get; set; }

        [ForeignKey("IdUsuario")]
        public Usuario Usuario { get; set; }

        public int IdProveedor { get; set; }

        [ForeignKey("IdProveedor")]
        public Proveedor Proveedor { get; set; }

        [InverseProperty("Compra")]
        public List<DetalleDeCompra> DetalleDeCompras { get; set; }
    
    }
}