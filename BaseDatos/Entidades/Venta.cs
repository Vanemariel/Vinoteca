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
        public DateTime FechaVenta { get; set; }
        public string FormaPago { get; set; }
        public decimal Total { get; set; }

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