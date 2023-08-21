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
        //[HttpGet(ApiRoutes.Caja.GetAll)]
        //public async Task<ActionResult<List<Caja>>> GetAll()
        //{
        //    try
        //    {
        //        List<Caja> Cajas = await this._context.TablaCajas.ToListAsync();

        //        return Ok(Cajas);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest($"Ha ocurrido un error, {ex.Message}");
        //    }
        //}

        #endregion

        #region HTTP POST
        [HttpPost(ApiRoutes.Caja.New)]
        public async Task<ActionResult<CajaDtoResponse>> New(CajaDtoRequest CajaDto)
        {
            try
            {
                CajaDtoResponse cajaResponse = new CajaDtoResponse();

                // Cerrar caja
                if (
                    CajaDto.fechaTurno != null && CajaDto.fondoCajaRecibido != null
                ){
                    Caja? fndCaja = await _context.TablaCajas
                        .FirstOrDefaultAsync(x => x.FechaTurno == CajaDto.fechaTurno);

                    if (fndCaja != null)
                    {
                        throw new Exception("Error al cerrar caja. Ya has cerrado caja anteriormente");
                    }

                    cajaResponse.fondoCajaRecibido = float.Parse(CajaDto.fondoCajaRecibido);
                    cajaResponse.fechaTurno = CajaDto.fechaTurno;
                    cajaResponse = await calculateMovCaja(cajaResponse);

                    Caja newCaja = new Caja
                    {
                        FondoCajaRecibido = cajaResponse.fondoCajaRecibido,
                        FechaTurno =  cajaResponse.fechaTurno,
                        EgresoProvedoresEfectivo = cajaResponse.egresoProvedoresEfectivo,
                        EgresoProvedoresDebito = cajaResponse.egresoProvedoresDebito,
                        FondoCajaEntregado = cajaResponse.fondoCajaEntregado,
                        IngresoVentaDebito = cajaResponse.ingresoVentaDebito,
                        IngresoVentaEfectivo = cajaResponse.ingresoVentaEfectivo
                    };

                    _context.TablaCajas.Add(newCaja);
                    await _context.SaveChangesAsync();

                    cajaResponse = mapperCajaReponse(newCaja);
                }
                else
                {
                    // Para vr movimientos de caja en X dia

                    Caja? fndCaja = await _context.TablaCajas
                     .FirstOrDefaultAsync(x => x.FechaTurno == CajaDto.fechaTurno);

                    if (fndCaja == null)
                    {
                        throw new Exception("En el dia ingresado, no has cerrado caja.");
                    }

                    cajaResponse = mapperCajaReponse(fndCaja);
                }

                return Ok(cajaResponse);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

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
                .Where(c => c.FechaVenta== cajaDto.fechaTurno)
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
        private CajaDtoResponse mapperCajaReponse(Caja caja)
        {
            return new CajaDtoResponse
            {
                idCaja = caja.IdCaja,
                fondoCajaRecibido = caja.FondoCajaRecibido,
                fechaTurno =  caja.FechaTurno,
                egresoProvedoresDebito = caja.EgresoProvedoresDebito,
                egresoProvedoresEfectivo = caja.EgresoProvedoresEfectivo,
                fondoCajaEntregado = caja.FondoCajaEntregado,
                ingresoVentaDebito = caja.IngresoVentaDebito,
                ingresoVentaEfectivo = caja.IngresoVentaEfectivo,
            };
        }

        #endregion

        #region HTTP PUT
        //[HttpPut(ApiRoutes.Caja.Update)]
        //public ActionResult Update(int id, [FromBody] Caja caja)
        //{
        //    if (id != caja.IdCaja)
        //    {
        //        return BadRequest("Datos incorrectos");
        //    }

        //    var cajitas = _context.TablaCajas.Where(e => e.IdCaja == id).FirstOrDefault();
        //    if (cajitas == null)
        //    {
        //        return NotFound("No existe la caja¿? para modificar");
        //    }

        //    cajitas.Fecha = cajitas.Fecha;
        //    cajitas.Inicio = cajitas.Inicio;
        //    cajitas.Cierre = cajitas.Cierre;

        //    try
        //    {
        //        //throw(new Exception("Cualquier Verdura"));
        //        _context.TablaCajas.Update(cajitas);
        //        _context.SaveChanges();
        //        return Ok();
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest($"Los datos no han sido actualizados por: {e.Message}");
        //    }
        //}
        #endregion

        #region HTTP DELETE
        //[HttpDelete(ApiRoutes.Caja.Delete)]
        //public ActionResult Delete(int id)
        //{
        //    var cajuelas = _context.TablaCajas.Where(x => x.IdCaja == id).FirstOrDefault();

        //    if (cajuelas == null)
        //    {
        //        return NotFound($"El registro {id} no fue encontrado");
        //    }
        //    try
        //    {
        //        _context.TablaCajas.Remove(cajuelas);
        //        _context.SaveChanges();
        //        return Ok($"El registro de {cajuelas.IdCaja} ha sido borrado.");
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest($"Los datos no pudieron eliminarse por: {e.Message}");
        //    }
        //}
        #endregion
    }
}
