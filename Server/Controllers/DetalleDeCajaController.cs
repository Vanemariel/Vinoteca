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
    public class DetalleDeCajaController : ControllerBase
    {
        private readonly BDContext _context;
        private readonly IConfiguration _configuration;


        public DetalleDeCajaController(BDContext context, IConfiguration configuration)
        {
            this._context = context;
            this._configuration = configuration;
        }

        #region HTTP GET 
        [HttpGet(ApiRoutes.DetalleDeCaja.GetAll)]
        public async Task<ActionResult<List<DetalleDeCaja>>> GetAll()
        {
            try
            {
                List<DetalleDeCaja> detalleDeCajas = await this._context.TablaDetalleDeCajas.ToListAsync();

                return Ok(detalleDeCajas);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }

        [HttpGet(ApiRoutes.DetalleDeCaja.GetById)]
        public async Task<ActionResult<DetalleDeCaja>> GetById(int id)
        {
            try
            {
                DetalleDeCaja? DetalleDeCaja = await this._context.TablaDetalleDeCajas
                    .Where(Caja => Caja.IdCaja == id)
                    .FirstOrDefaultAsync();

                if (DetalleDeCaja == null)
                {
                    throw new Exception($"no existe el det de caja con id igual a {id}.");
                }

                return Ok(DetalleDeCaja);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }
        #endregion

        #region HTTP POST
        [HttpPost(ApiRoutes.DetalleDeCaja.New)]
        public async Task<ActionResult<bool>> New(DetalleDeCajaDto detcajadto)
        {
            try
            {
                _context.TablaDetalleDeCajas.Add(new DetalleDeCaja
                {
                    Importe = detcajadto.Importe,
                    Saldo= detcajadto.Saldo,
                    IdCaja=detcajadto.IdCaja,
                    IdCompra=detcajadto.IdCompra
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
        [HttpPut(ApiRoutes.DetalleDeCaja.Update)]
        public ActionResult Update(int id, [FromBody] DetalleDeCaja cajitas)
        {
            if (id != cajitas.IdDetalleCaja)
            {
                return BadRequest("Datos incorrectos");
            }

            var cajitass = _context.TablaDetalleDeCajas.Where(e => e.IdDetalleCaja == id).FirstOrDefault();
            if (cajitass == null)
            {
                return NotFound("No existe la caja¿? para modificar");
            }

            cajitass.Importe = cajitass.Importe;
            cajitass.Saldo = cajitass.Saldo;

            try
            {
                //throw(new Exception("Cualquier Verdura"));
                _context.TablaDetalleDeCajas.Update(cajitass);
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
        [HttpDelete(ApiRoutes.Caja.Delete)]
        public ActionResult Delete(int id)
        {
            var cajuelaXs = _context.TablaDetalleDeCajas.Where(x => x.IdDetalleCaja == id).FirstOrDefault();

            if (cajuelaXs == null)
            {
                return NotFound($"El registro {id} no fue encontrado");
            }
            try
            {
                _context.TablaDetalleDeCajas.Remove(cajuelaXs);
                _context.SaveChanges();
                return Ok($"El registro de {cajuelaXs.IdDetalleCaja} ha sido borrado.");
            }
            catch (Exception e)
            {
                return BadRequest($"Los datos no pudieron eliminarse por: {e.Message}");
            }
        }
        #endregion
    }
}
