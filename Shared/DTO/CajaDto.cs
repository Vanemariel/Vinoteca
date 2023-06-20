using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class CajaDto
    {
        public string Fecha { get; set; }
        public float Inicio { get; set; }
        public float Cierre { get; set; }
        public int IdUsuario { get; set; }
    }
}
