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
    public class CompraController : ControllerBase
    {
        private readonly BDContext _context;
        private readonly IConfiguration _configuration;


        public CompraController(BDContext context, IConfiguration configuration)
        {
            this._context = context;
            this._configuration = configuration;
        }
        #region HTTPS
        [HttpGet(ApiRoutes.Compra.GetAll)]
        public async Task<ActionResult<List<Compra>>> GetAll()
        {
            try
            {
                List<Compra> Compras = await this._context.TablaCompras.ToListAsync();

                return Ok(Compras);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }

        [HttpGet(ApiRoutes.Compra.GetById)]
        public async Task<ActionResult<Compra>> GetById(int id)
        {
            try
            {
                Compra? Compra = await this._context.TablaCompras
                    .Where(Compra => Compra.IdCompra == id)
                    .FirstOrDefaultAsync();

                if (Compra == null)
                {
                    throw new Exception($"no existe la compra con id igual a {id}.");
                }

                return Ok(Compra);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }
        #endregion

        #region HTTP POST
        [HttpPost(ApiRoutes.Compra.New)]
        public async Task<ActionResult<bool>> New(CompraDto compradto)
        {
            try
            {
                _context.TablaCompras.Add(new Compra
                {
                    FechaCompra=compradto.FechaCompra,
                    efectivo=compradto.efectivo,
                    transferencia=compradto.transferencia,
                    Total=compradto.Total,
                    //NumeroDeFactura=compradto.NumeroDeFactura,
                    IdUsuario=compradto.IdUsuario,
                    IdProveedor=compradto.IdProveedor,
                    IdProducto=compradto.IdProducto,
                    cantidad=compradto.cantidad,
                    precio=compradto.precio,
                    DetalleDeCompras = new List<DetalleDeCompra>()
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
        [HttpPut(ApiRoutes.Compra.Update)]
        public ActionResult Update(int id, [FromBody] Compra compra)
        {
            if (id != compra.IdCompra)
            {
                return BadRequest("Datos incorrectos");
            }

            var comprax = _context.TablaCompras.Where(e => e.IdCompra == id).FirstOrDefault();
            if (comprax == null)
            {
                return NotFound("No existe la compra para modificar");
            }

            comprax.FechaCompra = compra.FechaCompra;
            comprax.efectivo=compra.efectivo;
            comprax.transferencia=compra.transferencia;
            comprax.Total = compra.Total;
            //comprax.NumeroDeFactura= compra.NumeroDeFactura;
            comprax.cantidad = compra.cantidad;
            comprax.precio = compra.precio;

            try
            {
                //throw(new Exception("Cualquier Verdura"));
                _context.TablaCompras.Update(comprax);
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
        [HttpDelete(ApiRoutes.Compra.Delete)]
        public ActionResult Delete(int id)
        {
            var comprax = _context.TablaCompras.Where(x => x.IdCompra == id).FirstOrDefault();

            if (comprax == null)
            {
                return NotFound($"El registro {id} no fue encontrado");
            }
            try
            {
                _context.TablaCompras.Remove(comprax);
                _context.SaveChanges();
                return Ok($"El registro de {comprax.IdCompra} ha sido borrado.");
            }
            catch (Exception e)
            {
                return BadRequest($"Los datos no pudieron eliminarse por: {e.Message}");
            }
        }
        #endregion
    }
}
