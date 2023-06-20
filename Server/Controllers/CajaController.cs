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
        [HttpGet(ApiRoutes.Caja.GetAll)]
        public async Task<ActionResult<List<Caja>>> GetAll()
        {
            try
            {
                List<Caja> Cajas = await this._context.TablaCajas.ToListAsync();

                return Ok(Cajas);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }

        [HttpGet(ApiRoutes.Caja.GetById)]
        public async Task<ActionResult<Caja>> GetById(int id)
        {
            try
            {
                Caja? Caja = await this._context.TablaCajas
                    .Where(Caja => Caja.IdCaja == id)
                    .FirstOrDefaultAsync();

                if (Caja == null)
                {
                    throw new Exception($"no existe la Caja con id igual a {id}.");
                }

                return Ok(Caja);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }
        #endregion

        #region HTTP POST
        [HttpPost(ApiRoutes.Caja.New)]
        public async Task<ActionResult<bool>> New(CajaDto cajadto)
        {
            try
            {
                _context.TablaCajas.Add(new Caja
                {
                    Fecha = cajadto.Fecha,
                    Inicio= cajadto.Inicio,
                    Cierre= cajadto.Cierre,
                    IdUsuario=cajadto.IdUsuario,
                    DetalleDeCajas =new List<DetalleDeCaja>()
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
        [HttpPut(ApiRoutes.Caja.Update)]
        public ActionResult Update(int id, [FromBody] Caja caja)
        {
            if (id != caja.IdCaja)
            {
                return BadRequest("Datos incorrectos");
            }

            var cajitas = _context.TablaCajas.Where(e => e.IdCaja == id).FirstOrDefault();
            if (cajitas == null)
            {
                return NotFound("No existe la caja¿? para modificar");
            }

            cajitas.Fecha = cajitas.Fecha;
            cajitas.Inicio = cajitas.Inicio;
            cajitas.Cierre = cajitas.Cierre;

            try
            {
                //throw(new Exception("Cualquier Verdura"));
                _context.TablaCajas.Update(cajitas);
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
            var cajuelas = _context.TablaCajas.Where(x => x.IdCaja == id).FirstOrDefault();

            if (cajuelas == null)
            {
                return NotFound($"El registro {id} no fue encontrado");
            }
            try
            {
                _context.TablaCajas.Remove(cajuelas);
                _context.SaveChanges();
                return Ok($"El registro de {cajuelas.IdCaja} ha sido borrado.");
            }
            catch (Exception e)
            {
                return BadRequest($"Los datos no pudieron eliminarse por: {e.Message}");
            }
        }
        #endregion
    }
}
