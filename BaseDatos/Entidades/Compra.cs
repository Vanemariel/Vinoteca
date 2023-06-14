﻿using System;
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
        public DateTime FechaCompra { get; set; }
        public string FormaPago { get; set; }
        public decimal Total { get; set; }
        public int NumeroDeFactura { get; set; }

        public int IdUsuario { get; set; }

        [ForeignKey("IdUsuario")]
        public Usuario Usuario { get; set; }

        public int IdProveedor { get; set; }

        [ForeignKey("IdProveedor")]
        public Proveedor Proveedor { get; set; }


        [InverseProperty("Compra")]
        public List<DetalleDeCompra> DetalleDeCompras { get; set; }
    
    }
}