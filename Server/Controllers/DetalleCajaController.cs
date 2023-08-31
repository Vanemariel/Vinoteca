using BaseDatos.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared.DTO;
using Vinoteca.BaseDatos;
using Vinoteca.Server.Contracts;
using static Vinoteca.Server.Contracts.ApiRoutes;

namespace Server.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class DetalleCajaController : Controller
    {
        private readonly BDContext _context;
        private readonly IConfiguration _configuration;

        public DetalleCajaController(BDContext context, IConfiguration configuration)
        {
            this._context = context;
            this._configuration = configuration;
        }

        #region HTTP GET 
        [HttpGet(ApiRoutes.DetalleDeCaja.GetAll)]
        public async Task<ActionResult<List<DetalleCaja>>> GetAll()
        {
            try
            {
                List<DetalleCaja> Caja = await this._context.TablaDetalleDeCaja.ToListAsync();

                return Ok(Caja);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }
        #endregion



        #region HTTP DELETE
        [HttpDelete(ApiRoutes.DetalleDeCaja.Delete)]
        public ActionResult Delete(int id)
        {
            var clientex = _context.TablaDetalleDeCaja.Where(x => x.IdDetalleCaja == id).FirstOrDefault();

            if (clientex == null)
            {
                return NotFound($"El registro {id} no fue encontrado");
            }
            try
            {
                _context.TablaDetalleDeCaja.Remove(clientex);
                _context.SaveChanges();
                return Ok($"El registro de {clientex.IdDetalleCaja} ha sido borrado.");
            }
            catch (Exception e)
            {
                return BadRequest($"Los datos no pudieron eliminarse por: {e.Message}");
            }
        }
        #endregion
    }
}
