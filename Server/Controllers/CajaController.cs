using Azure;
using BaseDatos.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared.DTO;
using System.Collections.Generic;
using Vinoteca.BaseDatos;
using Vinoteca.Server.Contracts;
using static Vinoteca.Server.Contracts.ApiRoutes;

using Caja = BaseDatos.Entidades.Caja;
using Compra = BaseDatos.Entidades.Compra;
using Venta = BaseDatos.Entidades.Venta;

namespace Vinoteca.Server.Controllers
{

    [ApiController]
    [Route("Api/[controller]")]
    public class CajaController : ControllerBase
    {
        private readonly BDContext _context;
        private readonly IConfiguration _configuration;


        public CajaController(BDContext context, IConfiguration configuration)
        {
            this._context = context;
            this._configuration = configuration;
        }

        #region HTTP GET 
        [HttpGet(ApiRoutes.Caja.GetByDate)]
        public async Task<ObjectResult> GetByDate(string fechaTurno)
        {
            ObjectResult response = new ObjectResult(null);

            try
            {
                Caja? fndCaja = await _context.TablaCajas
                 .FirstOrDefaultAsync(x => x.FechaTurno == fechaTurno);

                if (fndCaja == null)
                {
                    throw new Exception("En el dia ingresado, no has iniciado caja.");
                }

                CajaDtoResponse cajaResponse = new CajaDtoResponse();

                cajaResponse.idCaja = fndCaja.IdCaja;
                cajaResponse.fondoCajaRecibido = fndCaja.FondoCajaRecibido;
                cajaResponse.fechaTurno = fndCaja.FechaTurno;
                cajaResponse = await calculateMovCaja(cajaResponse);

                response.Value = cajaResponse;
            }
            catch (Exception ex)
            {
                response.StatusCode = 400;
                 
                response.Value = ex.Message;
            }
            return response;
        }


        #endregion
        #region HTTP POST
        [HttpPost(ApiRoutes.Caja.OpenCaja)]
        public async Task<ObjectResult> OpenCaja(CajaDtoRequest CajaDto) /// INICIAMOS CAJA
        {
            ObjectResult response = new ObjectResult(null);

            try
            {
                // Cerrar caja
                if (CajaDto.fechaTurno == "" || CajaDto.fondoCajaRecibido == null)
                {
                    throw new Exception("No ha ingresado los datos necesarios");
                }

                Caja? fndCaja = await _context.TablaCajas
                        .FirstOrDefaultAsync(x => x.FechaTurno == CajaDto.fechaTurno);

                if (fndCaja != null)
                {
                    throw new Exception("Error al cerrar caja. Ya has iniciado caja anteriormente");
                }

                Caja newCaja = new Caja
                {
                    FondoCajaRecibido = float.Parse(CajaDto.fondoCajaRecibido),
                    FechaTurno = CajaDto.fechaTurno,
                    EgresoProvedoresEfectivo = 0,
                    EgresoProvedoresDebito = 0,
                    FondoCajaEntregado = 0,
                    IngresoVentaDebito = 0,
                    IngresoVentaEfectivo = 0
                };

                _context.TablaCajas.Add(newCaja);
                await _context.SaveChangesAsync();

                response.Value = "Se ha iniciado caja correctamente!";
            }
            catch (Exception e)
            {
                response.StatusCode = 400;
                response.Value = e.Message;
            }
            return response;
        }


        [HttpPost(ApiRoutes.Caja.CloseCaja)]
        public async Task<ObjectResult> CloseCaja(CajaDtoRequest CajaDto) /// CERRAMOS CAJA
        {
            ObjectResult response = new ObjectResult(null);

            try
            {
                // Cerrar caja
                if (CajaDto.fechaTurno == "")
                {
                    throw new Exception("No ha ingresado los datos necesarios");
                }

                Caja? fndCaja = await _context.TablaCajas
                        .FirstOrDefaultAsync(x => x.FechaTurno == CajaDto.fechaTurno);

                if (fndCaja == null)
                {
                    throw new Exception("Error al cerrar caja. No has iniciado caja anteriormente");
                }

                CajaDtoResponse cajaResponse = new CajaDtoResponse();

                cajaResponse.fondoCajaRecibido = fndCaja.FondoCajaRecibido;
                cajaResponse.fechaTurno = CajaDto.fechaTurno;
                cajaResponse = await calculateMovCaja(cajaResponse);

                Caja newCaja = new Caja
                {
                    FondoCajaRecibido = cajaResponse.fondoCajaRecibido,
                    FechaTurno = cajaResponse.fechaTurno,
                    EgresoProvedoresEfectivo = cajaResponse.egresoProvedoresEfectivo,
                    EgresoProvedoresDebito = cajaResponse.egresoProvedoresDebito,
                    FondoCajaEntregado = cajaResponse.fondoCajaEntregado,
                    IngresoVentaDebito = cajaResponse.ingresoVentaDebito,
                    IngresoVentaEfectivo = cajaResponse.ingresoVentaEfectivo
                };

                _context.TablaCajas.Add(newCaja);
                await _context.SaveChangesAsync();

                response.Value = "Se ha cerrado caja correctamente!";
            }
            catch (Exception e)
            {
                response.StatusCode = 400;
                response.Value = e.Message;
            }
            return response;
        }


        #endregion

        private async Task<CajaDtoResponse> calculateMovCaja(CajaDtoResponse cajaDto)
        {

            List<Compra> listaCompras = await _context.TablaCompras
                .Where(c => c.FechaCompra == cajaDto.fechaTurno)
                .ToListAsync();


            listaCompras.ForEach((Compra compra) =>
            {
                if (compra.Transferencia)
                {
                    cajaDto.egresoProvedoresEfectivo += compra.Total;
                }

                if (compra.Efectivo)
                {
                    cajaDto.egresoProvedoresDebito += compra.Total;
                }
            });

            List<Venta> listaVentas = await _context.TablaVentas
                .Where(c => c.FechaVenta == cajaDto.fechaTurno)
                .ToListAsync();

            listaVentas.ForEach((Venta venta) =>
            {
                if (venta.Transferencia)
                {
                    cajaDto.ingresoVentaDebito += venta.Total;
                }

                if (venta.Efectivo)
                {
                    cajaDto.ingresoVentaEfectivo += venta.Total;
                }
            });

            cajaDto.fondoCajaEntregado = (float)(
                cajaDto.fondoCajaRecibido +
                cajaDto.ingresoVentaDebito +
                cajaDto.ingresoVentaEfectivo -
                cajaDto.egresoProvedoresEfectivo -
                cajaDto.egresoProvedoresDebito
            );

            return cajaDto;
        }

    }
}
