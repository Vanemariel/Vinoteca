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
        public readonly string NombreProveedor;

        [Key]
        public int IdCompra { get; set; }
        public string FechaCompra { get; set; }
        public string NumeroDeFactura { get; set; }
        public bool Efectivo { get; set; }
        public bool Transferencia { get; set; }
        public float Total { get; set; }

        public int IdUsuario { get; set; }
        [ForeignKey("IdUsuario")]
        public Usuario Usuario { get; set; }

        public int IdProveedor { get; set; }
        [ForeignKey("IdProveedor")]
        public  Proveedor Proveedor { get; set; }

        [InverseProperty("Compra")]
        public List<DetalleDeCompra> DetalleDeCompras { get; set; }


        /////////////
        public int? IdDetalleCaja { get; set; }
        [ForeignKey("IdDetalleCaja")]
        public DetalleCaja? DetallesCaja { get; set; }
    }
}