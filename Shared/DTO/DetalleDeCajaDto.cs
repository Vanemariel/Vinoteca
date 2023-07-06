using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class DetalleDeCajaDto
    {
        //EVERY DETAILS WORKS 
        public float Importe { get; set; }
        public float Saldo { get; set; }
        public int IdCaja { get; set; }
        public int? IdCompra { get; set; }
    }
}
