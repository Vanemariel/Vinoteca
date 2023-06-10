using BaseDatos.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Omnichannel.Contracts;
using System;
using System.Diagnostics.Metrics;
using Vinoteca.BaseDatos;
using Vinoteca.BaseDatos.Entidades;

namespace Vinoteca1.Server.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ClienteController : ControllerBase
    {
        private readonly BDContext _context;
        private readonly IConfiguration _configuration;


        public ClienteController(BDContext context, IConfiguration configuration)
        {
            this._context = context;
            this._configuration = configuration;
        }


        #region HTTP GET 
        [HttpGet(ApiRoutes.Cliente.GetAll)]
        public async Task<ActionResult<List<Cliente>>> GetAll()
        {
            try
            {
                List<Cliente> Clientes = await this._context.TablaClientes.ToListAsync();

                return Ok(Clientes);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }

        [HttpGet(ApiRoutes.Cliente.GetById)]
        public async Task<ActionResult<Cliente>> GetById(int id)
        {
            try
            {
                Cliente? Cliente = await this._context.TablaClientes
                    .Where(Cliente => Cliente.IdCliente == id)
                    .FirstOrDefaultAsync();

                if (Cliente == null)
                {
                    throw new Exception($"no existe el Cliente con id igual a {id}.");
                }

                return Ok(Cliente);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }
        #endregion

        #region HTTP POST
        [HttpPost(ApiRoutes.Cliente.New)]
        public async Task<ActionResult<int>> New(Cliente cliente)
        {
            try
            {

                _context.TablaClientes.Add(cliente);
                await _context.SaveChangesAsync();
                return cliente.IdCliente;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        #endregion

        #region HTTP PUT
        [HttpPut(ApiRoutes.Cliente.Update)]
        public ActionResult Update(int id, [FromBody] Cliente cliente)
        {
            if (id != cliente.IdCliente)
            {
                return BadRequest("Datos incorrectos");
            }

            var clientex = _context.TablaClientes.Where(e => e.IdCliente == id).FirstOrDefault();
            if (clientex == null)
            {
                return NotFound("No existe el Cliente para modificar");
            }
            //clientex.Id = cliente.IdCliente;
            clientex.Nombre = cliente.Nombre;
            cliente.Direccion = cliente.Direccion;
            cliente.Telefono = cliente.Telefono;

            try
            {
                //throw(new Exception("Cualquier Verdura"));
                _context.TablaClientes.Update(clientex);
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
        [HttpDelete(ApiRoutes.Cliente.Delete)]
        public ActionResult Delete(int id)
        {
            var clientex = _context.TablaClientes.Where(x => x.IdCliente == id).FirstOrDefault();

            if (clientex == null)
            {
                return NotFound($"El registro {id} no fue encontrado");
            }
            try
            {
                _context.TablaClientes.Remove(clientex);
                _context.SaveChanges();
                return Ok($"El registro de {clientex.IdCliente} ha sido borrado.");
            }
            catch (Exception e)
            {
                return BadRequest($"Los datos no pudieron eliminarse por: {e.Message}");
            }
        }
        #endregion

    }

}
