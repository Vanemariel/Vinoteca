﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vinoteca.BaseDatos;

namespace BaseDatos.Entidades
{
    public class DetalleDeCompra
    {
        [Key]
        public int IdDetalleCompra { get; set; }

        public int IdCompra { get; set; }
        [ForeignKey("IdCompra")]
        public Compra Compra { get; set; }

        public int IdProducto { get; set; }
        [ForeignKey("IdProducto")]
        public Producto Producto { get; set; }

        public int Cantidad { get; set; }
        public float Total { get; set; }
    }
}
