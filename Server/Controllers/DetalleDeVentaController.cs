using BaseDatos.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared.DTO;
using System.Collections.Generic;
using Vinoteca.BaseDatos;
using Vinoteca.Server.Contracts;

namespace Vinoteca.Server.Controllers
{

    [ApiController]
    [Route("Api/[controller]")]
    public class DetalleDeVentaController : ControllerBase
    {
        private readonly BDContext _context;
        private readonly IConfiguration _configuration;


        public DetalleDeVentaController(BDContext context, IConfiguration configuration)
        {
            this._context = context;
            this._configuration = configuration;
        }

        #region HTTP GET 
        [HttpGet(ApiRoutes.DetalleDeVenta.GetAll)]
        public async Task<ActionResult<List<DetalleDeVenta>>> GetAll()
        {
            try
            {
                List<DetalleDeVenta> detalleDeVentas = await this._context.TablaDetalleDeVentas.ToListAsync();

                return Ok(detalleDeVentas);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }

        [HttpGet(ApiRoutes.DetalleDeVenta.GetById)]
        public async Task<ActionResult<DetalleDeVenta>> GetById(int id)
        {
            try
            {
                DetalleDeVenta? DetalleDeVta = await this._context.TablaDetalleDeVentas
                    .Where(DetalleDeVta => DetalleDeVta.IdDetalleVenta == id)
                    .FirstOrDefaultAsync();

                if (DetalleDeVta == null)
                {
                    throw new Exception($"no existe el det de caja con id igual a {id}.");
                }

                return Ok(DetalleDeVta);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }
        #endregion

        #region HTTP POST
        [HttpPost(ApiRoutes.DetalleDeVenta.New)]
        public async Task<ActionResult<bool>> New(DetalleDeVentaDto detvtadto)
        {
            try
            {
                _context.TablaDetalleDeVentas.Add(new DetalleDeVenta
                {
                    PrecioVenta = detvtadto.PrecioVenta,
                    CantidadVenta= detvtadto.CantidadVenta,
                    IdVenta=detvtadto.IdVenta,
                    IdProducto=detvtadto.IdProducto
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
        [HttpPut(ApiRoutes.DetalleDeVenta.Update)]
        public ActionResult Update(int id, [FromBody] DetalleDeVenta ventitas)
        {
            if (id != ventitas.IdDetalleVenta)
            {
                return BadRequest("Datos incorrectos");
            }

            var ventitass = _context.TablaDetalleDeVentas.Where(e => e.IdDetalleVenta == id).FirstOrDefault();
            if (ventitass == null)
            {
                return NotFound("No existe el detalle ¿? para modificar");
            }

            ventitass.PrecioVenta = ventitass.PrecioVenta;
            ventitass.CantidadVenta = ventitass.CantidadVenta;

            try
            {
                //throw(new Exception("Cualquier Verdura"));
                _context.TablaDetalleDeVentas.Update(ventitass);
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
        [HttpDelete(ApiRoutes.DetalleDeVenta.Delete)]
        public ActionResult Delete(int id)
        {
            var ventarrones = _context.TablaDetalleDeVentas.Where(x => x.IdDetalleVenta == id).FirstOrDefault();

            if (ventarrones == null)
            {
                return NotFound($"El registro {id} no fue encontrado");
            }
            try
            {
                _context.TablaDetalleDeVentas.Remove(ventarrones);
                _context.SaveChanges();
                return Ok($"El registro de {ventarrones.IdDetalleVenta} ha sido borrado.");
            }
            catch (Exception e)
            {
                return BadRequest($"Los datos no pudieron eliminarse por: {e.Message}");
            }
        }
        #endregion
    }
}

