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
                List<Compra> Compras = await this._context.TablaCompras
                    .Include(venta => venta.Proveedor)
                    .Include(venta => venta.Usuario)
                    //.Include(venta => venta.producto)
                    .ToListAsync();

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
                    .Include(venta => venta.Proveedor)
                    .Include(venta => venta.Usuario)
                    //.Include(venta => venta.Producto)
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
                Compra newCompra = new Compra
                {
                    FechaCompra=compradto.fechaCompra,
                    Efectivo=compradto.efectivo,
                    Transferencia=compradto.transferencia,
                    Total=compradto.totalCompra,
                    NumeroDeFactura=compradto.numeroDeFactura,
                    IdUsuario=compradto.idUsuario,
                    IdProveedor=compradto.idProveedor,
                    //IdProducto=compradto.IdProducto,
                    DetalleDeCompras = new List<DetalleDeCompra>()
                };

                _context.TablaCompras.Add(newCompra);
                await _context.SaveChangesAsync();


                if (newCompra == null)
                {
                    throw new Exception("No se pudo registrar la compra correctamente.");
                }
                compradto.listaProductos.ForEach(prodCompra =>
                {
                    _context.TablaDetalleDeCompras.Add(new DetalleDeCompra
                    {
                        Cantidad = prodCompra.cantidad,
                        IdProducto = prodCompra.idProducto,
                        Total = prodCompra.total,
                        IdCompra = newCompra.IdCompra
                    });
                    Producto? producto = _context.TablaProductos
                        .FirstOrDefault(prod => prod.IdProducto == prodCompra.idProducto);

                    if (producto == null)
                    {
                        throw new Exception("No se pudo encontrar el producto.");
                    }

                    producto.Stock = producto.Stock - prodCompra.cantidad;
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
        [HttpPut(ApiRoutes.Compra.Update)]
        public ActionResult Update(int id, [FromBody] Compra compra)
        {
            if (id != compra.IdCompra)
            {
                return BadRequest("Datos incorrectos");
            }

            var comprax = _context.TablaCompras
                .Where(e => e.IdCompra == id)
                 .Include(venta => venta.Proveedor)
                    .Include(venta => venta.Usuario)
                    //.Include(venta => venta.Producto)
                .FirstOrDefault();
            if (comprax == null)
            {
                return NotFound("No existe la compra para modificar");
            }

            comprax.FechaCompra = compra.FechaCompra;
            comprax.efectivo=compra.efectivo;
            comprax.transferencia=compra.transferencia;
            comprax.Total = compra.Total;
            
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
