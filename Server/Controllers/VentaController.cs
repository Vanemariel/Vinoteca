using BaseDatos.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vinoteca.Server.Contracts;
using System;
using System.Diagnostics.Metrics;
using Vinoteca.BaseDatos;
using Vinoteca.BaseDatos.Entidades;
using Shared.DTO;

namespace Vinoteca.Server.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class VentaController : ControllerBase
    {
        private readonly BDContext _context;
        private readonly IConfiguration _configuration;


        public VentaController(BDContext context, IConfiguration configuration)
        {
            this._context = context;
            this._configuration = configuration;
        }
        #region HTTPS
        [HttpGet(ApiRoutes.Venta.GetAll)]
        public async Task<ActionResult<List<Venta>>> GetAll()
        {
            try
            {
                List<Venta> Ventas = await this._context.TablaVentas.ToListAsync();

                return Ok(Ventas);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }

        [HttpGet(ApiRoutes.Venta.GetById)]
        public async Task<ActionResult<Venta>> GetById(int id)
        {
            try
            {
                Venta? Venta = await this._context.TablaVentas
                    .Where(Venta => Venta.IdVenta == id)
                    .FirstOrDefaultAsync();

                if (Venta == null)
                {
                    throw new Exception($"no existe la venta con id igual a {id}.");
                }

                return Ok(Venta);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }
        #endregion

        #region HTTP POST
        [HttpPost(ApiRoutes.Venta.New)]
        public async Task<ActionResult<bool>> New(VentaDto ventadto)
        {
            try
            {
                _context.TablaVentas.Add(new Venta
                {
                    FechaVenta=ventadto.FechaVenta,
                    efectivo=ventadto.efectivo,
                    transferencia=ventadto.transferencia,
                    Total=ventadto.Total,
                    IdUsuario=ventadto.IdUsuario,
                    IdCliente=ventadto.IdCliente,
                    IdProducto=ventadto.IdProducto,
                    cantidad=ventadto.cantidad,
                    precio=ventadto.precio,
                    precioVenta=ventadto.precioVenta,
                    NumeroDeFactura=ventadto.NumeroDeFactura,

                    DetalleDeVentas= new List<DetalleDeVenta>()
                }) ;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        #endregion

        #region HTTP PUT
        [HttpPut(ApiRoutes.Venta.Update)]
        public ActionResult Update(int id, [FromBody] Venta venta)
        {
            if (id != venta.IdVenta)
            {
                return BadRequest("Datos incorrectos");
            }

            var ventax = _context.TablaVentas.Where(e => e.IdVenta == id).FirstOrDefault();
            if (ventax == null)
            {
                return NotFound("No existe la venta para modificar");
            }

            ventax.FechaVenta = venta.FechaVenta;
            ventax.efectivo = venta.efectivo;
            ventax.transferencia = venta.transferencia;
            ventax.Total = venta.Total;

            try
            {
                //throw(new Exception("Cualquier Verdura"));
                _context.TablaVentas.Update(ventax);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest($"Los datos no han sido actualizados por: {e.Message}");
            }
        }
        #endregion

        #region HTTP DELETE
        [HttpDelete(ApiRoutes.Venta.Delete)]
        public ActionResult Delete(int id)
        {
            var ventax = _context.TablaVentas.Where(x => x.IdVenta == id).FirstOrDefault();

            if (ventax == null)
            {
                return NotFound($"El registro {id} no fue encontrado");
            }
            try
            {
                _context.TablaVentas.Remove(ventax);
                _context.SaveChanges();
                return Ok($"El registro de {ventax.IdVenta} ha sido borrado.");
            }
            catch (Exception e)
            {
                return BadRequest($"Los datos no pudieron eliminarse por: {e.Message}");
            }
        }
        #endregion
    }
}
