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
    public class ProveedorController : ControllerBase
    {
        private readonly BDContext _context;
        private readonly IConfiguration _configuration;


        public ProveedorController(BDContext context, IConfiguration configuration)
        {
            this._context = context;
            this._configuration = configuration;
        }


        #region HTTP GET 
        [HttpGet(ApiRoutes.Proveedor.GetAll)]
        public async Task<ActionResult<List<Proveedor>>> GetAll()
        {
            try
            {
                List<Proveedor> proveedores = await this._context.TablaProveedores.ToListAsync();

                return Ok(proveedores);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }

        [HttpGet(ApiRoutes.Proveedor.GetById)]
        public async Task<ActionResult<Proveedor>> GetById(int id)
        {
            try
            {
                Proveedor? proveedor = await this._context.TablaProveedores
                    .Where(proveedor => proveedor.IdProveedor == id)
                    .FirstOrDefaultAsync();

                if (proveedor == null)
                {
                    throw new Exception($"no existe el Proveedor con id igual a {id}.");
                }

                return Ok(proveedor);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }
        #endregion

        #region HTTP POST
        [HttpPost(ApiRoutes.Proveedor.New)]
        public async Task<ActionResult<bool>> New(ProveedorDto proveedordto)
        {
            try
            {

                _context.TablaProveedores.Add(new Proveedor
                {
                    Nombre= proveedordto.Nombre,
                    Descripcion= proveedordto.Descripcion,
                    Telefono= proveedordto.Telefono,
                    HorarioDesde= proveedordto.HorarioDesde,
                    HorarioHasta= proveedordto.HorarioHasta,
                    Productos= new List<Producto>()
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
        [HttpPut(ApiRoutes.Proveedor.Update)]
        public ActionResult Update(int id, [FromBody] Proveedor proveedor)
        {
            if (id != proveedor.IdProveedor)
            {
                return BadRequest("Datos incorrectos");
            }

            var provedoresx = _context.TablaProveedores.Where(e => e.IdProveedor == id).FirstOrDefault();
            if (provedoresx == null)
            {
                return NotFound("No existe el Proveedor para modificar");
            }
            //clientex.Id = cliente.IdCliente;
            provedoresx.Nombre = proveedor.Nombre;
            provedoresx.Descripcion = proveedor.Descripcion;
            provedoresx.HorarioDesde = proveedor.HorarioDesde;
            provedoresx.HorarioHasta = proveedor.HorarioHasta;
            provedoresx.Telefono = proveedor.Telefono;

            try
            {
                //throw(new Exception("Cualquier Verdura"));
                _context.TablaProveedores.Update(provedoresx);
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
        [HttpDelete(ApiRoutes.Proveedor.Delete)]
        public ActionResult Delete(int id)
        {
            var provedoresx = _context.TablaProveedores.Where(x => x.IdProveedor == id).FirstOrDefault();

            if (provedoresx == null)
            {
                return NotFound($"El registro {id} no fue encontrado");
            }
            try
            {
                _context.TablaProveedores.Remove(provedoresx);
                _context.SaveChanges();
                return Ok($"El registro de {provedoresx.IdProveedor} ha sido borrado.");
            }
            catch (Exception e)
            {
                return BadRequest($"Los datos no pudieron eliminarse por: {e.Message}");
            }
        }
        #endregion

    }

}