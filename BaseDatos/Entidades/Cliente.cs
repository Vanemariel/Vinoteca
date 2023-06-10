using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vinoteca.BaseDatos;

namespace BaseDatos.Entidades
{
    public class Cliente
    {
        [Key]
        public int IdCliente { get; set; } /* Primary Key */
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public int Telefono { get; set; }
    }
}
