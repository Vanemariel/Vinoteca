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
    public class ProductoController : ControllerBase
    {
        private readonly BDContext _context;
        private readonly IConfiguration _configuration;


        public ProductoController(BDContext context, IConfiguration configuration)
        {
            this._context = context;
            this._configuration = configuration;
        }


        #region HTTP GET 
        [HttpGet(ApiRoutes.Producto.GetAll)]
        public async Task<ActionResult<List<Producto>>> GetAll()
        {
            try
            {
                List<Producto> producto = await this._context.TablaProductos.ToListAsync();
                Console.WriteLine("hola");
                Console.WriteLine(producto);

                return Ok(producto);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }

        [HttpGet(ApiRoutes.Producto.GetById)]
        public async Task<ActionResult<Producto>> GetById(int id)
        {
            try
            {
                Producto? producto = await this._context.TablaProductos
                    .Where(producto => producto.IdProducto == id)
                    .FirstOrDefaultAsync();

                if (producto == null)
                {
                    throw new Exception($"no existe el Producto con id igual a {id}.");
                }

                return Ok(producto);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }
        #endregion

        #region HTTP POST
        [HttpPost(ApiRoutes.Producto.New)]
        public async Task<ActionResult<bool>> New(ProductoDto productodto)
        {
            try
            {

                _context.TablaProductos.Add(new Producto
                {
                    NombreProducto= productodto.NombreProducto,
                    Detalle= productodto.Detalle,
                    PrecioCompra= productodto.PrecioCompra,
                    PrecioVenta= productodto.PrecioVenta,
                    Stock= productodto.Stock,
                    IdProveedor= productodto.IdProveedor,
                    DetallesCompra= new List<DetalleDeCompra>()
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
        [HttpPut(ApiRoutes.Producto.Update)]
       // public ActionResult Update(int id, [FromBody] Producto producto)
        public ActionResult Update(ProductoDto producto)
        {
            //if (id != producto.IdProducto)
            //{
            //    return BadRequest("Datos incorrectos");
            //}

            var productox = _context.TablaProductos.Where(e => e.IdProducto == producto.IdProducto).FirstOrDefault();
            if (productox == null)
            {
                return NotFound("No existe el Producto para modificar");
            }
            //clientex.Id = cliente.IdCliente;
            productox.NombreProducto = producto.NombreProducto;
            productox.Stock = producto.Stock;
            productox.Detalle = producto.Detalle;
            productox.PrecioVenta = producto.PrecioVenta;
            productox.PrecioCompra = producto.PrecioCompra;


            try
            {
                //throw(new Exception("Cualquier Verdura"));
                _context.TablaProductos.Update(productox);
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
        [HttpDelete(ApiRoutes.Producto.Delete)]
        public ActionResult Delete(int id)
        {
            var productox = _context.TablaProductos.Where(x => x.IdProducto == id).FirstOrDefault();

            if (productox == null)
            {
                return NotFound($"El registro {id} no fue encontrado");
            }
            try
            {
                _context.TablaProductos.Remove(productox);
                _context.SaveChanges();
                return Ok($"El registro de {productox.IdProducto} ha sido borrado.");
            }
            catch (Exception e)
            {
                return BadRequest($"Los datos no pudieron eliminarse por: {e.Message}");
            }
        }
        #endregion

    }

}