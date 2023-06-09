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
    public class Proveedor
    {
        [Key]
        public int IdProveedor { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string HorarioDesde { get; set; }
        public string HorarioHasta { get; set; }
        public long Telefono { get; set; }

        [InverseProperty("Proveedor")]
        public List<Producto> Productos { get; set; }
    }
}