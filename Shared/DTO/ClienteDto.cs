using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class ClienteDto
    {
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public long Telefono { get; set; }
    }
}
