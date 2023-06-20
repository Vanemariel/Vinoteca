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
    public class Caja
    {
        [Key]
        public int IdCaja { get; set; }  /* Primary Key */
        public string Fecha { get; set; }
        public float Inicio { get; set; }
        public float Cierre { get; set; }

        [ForeignKey("Usuario")]
        public int IdUsuario { get; set; }
        public Usuario Usuario { get; set; }

        [InverseProperty("Caja")]
        public List<DetalleDeCaja> DetalleDeCaja { get; set; }
    }
}