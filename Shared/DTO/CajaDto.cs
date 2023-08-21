using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class CajaDtoRequest
    {
        public string fechaTurno { get; set; }
        public string? fondoCajaRecibido { get; set; }
        
    }

    public class CajaDtoResponse
    {
        public int idCaja { get; set; }
        public string fechaTurno { get; set; }
        public float fondoCajaRecibido { get; set; }
        public float egresoProvedoresEfectivo { get; set; }
        public float egresoProvedoresDebito { get; set; }
        public float ingresoVentaEfectivo { get; set; }
        public float ingresoVentaDebito { get; set; }
        public float fondoCajaEntregado{ get; set; }

    }
}
