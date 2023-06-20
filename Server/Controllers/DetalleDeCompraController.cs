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
    public class DetalleDeCompraController : ControllerBase
    {
        private readonly BDContext _context;
        private readonly IConfiguration _configuration;


        public DetalleDeCompraController(BDContext context, IConfiguration configuration)
        {
            this._context = context;
            this._configuration = configuration;
        }
        #region HTTPS
        [HttpGet(ApiRoutes.DetalleDeCompra.GetAll)]
        public async Task<ActionResult<List<DetalleDeCompra>>> GetAll()
        {
            try
            {
                List<DetalleDeCompra> detCompras = await this._context.TablaDetalleDeCompras.ToListAsync();

                return Ok(detCompras);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }

        [HttpGet(ApiRoutes.DetalleDeCompra.GetById)]
        public async Task<ActionResult<DetalleDeCompra>> GetById(int id)
        {
            try
            {
                DetalleDeCompra? detCompras = await this._context.TablaDetalleDeCompras
                    .Where(detCompras => detCompras.IdDetalleCompra == id)
                    .FirstOrDefaultAsync();

                if (detCompras == null)
                {
                    throw new Exception($"no existe la compra con id igual a {id}.");
                }

                return Ok(detCompras);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }
        #endregion

        #region HTTP POST
        [HttpPost(ApiRoutes.DetalleDeCompra.New)]
        public async Task<ActionResult<bool>> New(DetalleDeCompraDto DetalleDeCompraDTO)
        {
            try
            {
                _context.TablaDetalleDeCompras.Add(new DetalleDeCompra
                {
                    PrecioCompra=DetalleDeCompraDTO.PrecioCompra,
                    CantidadCompra=DetalleDeCompraDTO.CantidadCompra,
                    IdCompra=DetalleDeCompraDTO.IdCompra,
                    IdProducto=DetalleDeCompraDTO.IdProducto
                });
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
        [HttpPut(ApiRoutes.DetalleDeCompra.Update)]
        public ActionResult Update(int id, [FromBody] DetalleDeCompra detalleDeCompra)
        {
            if (id != detalleDeCompra.IdDetalleCompra)
            {
                return BadRequest("Datos incorrectos");
            }

            var cAjAjAjA = _context.TablaDetalleDeCompras.Where(e => e.IdDetalleCompra == id).FirstOrDefault();
            if (cAjAjAjA == null)
            {
                return NotFound("No existe la compra para modificar");
            }

            cAjAjAjA.PrecioCompra = cAjAjAjA.PrecioCompra;
            cAjAjAjA.CantidadCompra = cAjAjAjA.CantidadCompra;

            try
            {
                //throw(new Exception("Cualquier Verdura"));
                _context.TablaDetalleDeCompras.Update(cAjAjAjA);
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
        [HttpDelete(ApiRoutes.DetalleDeCompra.Delete)]
        public ActionResult Delete(int id)
        {
            var compraps = _context.TablaDetalleDeCompras.Where(x => x.IdDetalleCompra == id).FirstOrDefault();

            if (compraps == null)
            {
                return NotFound($"El registro {id} no fue encontrado");
            }
            try
            {
                _context.TablaDetalleDeCompras.Remove(compraps);
                _context.SaveChanges();
                return Ok($"El registro de {compraps.IdDetalleCompra} ha sido borrado.");
            }
            catch (Exception e)
            {
                return BadRequest($"Los datos no pudieron eliminarse por: {e.Message}");
            }
        }
        #endregion
    }
}

