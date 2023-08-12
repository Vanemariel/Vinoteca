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
        public async Task<ActionResult<List<DetalleDeVentaDto>>> GetAll()
        {
            try
            {
                List<DetalleDeVenta> detalleDeVentas = await this._context.TablaDetalleDeVentas
                    .Include(detalleDeVentas => detalleDeVentas.Producto)
                    .Include(detalleDeVentas => detalleDeVentas.Venta)
                       .ThenInclude(Venta => Venta.Usuario)
                    .ToListAsync();
                var mappedData = detalleDeVentas.Select(detalle => new DetalleDeVentaDto
                //return Ok(detalleDeVentas);
                {
                    idDetalleVenta = detalle.IdDetalleVenta,
                    fechaVenta = detalle.Venta?.FechaVenta,
                    idVenta = detalle.IdVenta,
                    nombreUsuario = detalle.Venta.Usuario.Nombre,
                    cantidad = detalle.Cantidad,
                    total = detalle.Total,
                    efectivo = detalle.Venta.Efectivo,
                    transferencia = detalle.Venta.Transferencia,
                    numeroDeFactura = detalle.Venta.NumeroDeFactura,
                    idProducto = detalle.IdProducto,
                    nombreCliente = detalle.Venta.NombreCliente,
                    nombreProducto = detalle.Producto.NombreProducto
                }).ToList();
                return Ok(mappedData);
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
                var detalle = await this._context.TablaDetalleDeVentas
                      .Include(detalle => detalle.Producto)
                      .Include(detalle => detalle.Venta)
                      .FirstOrDefaultAsync(detalle => detalle.IdDetalleVenta == id);
               
                if (detalle == null)
                {
                    return NotFound();
                }
              
                var detalleDTO = new DetalleDeVentaDto
                {
                    fechaVenta = detalle.Venta?.FechaVenta,
                    idVenta = detalle.IdVenta,
                    nombreUsuario = detalle.Venta.Usuario.Nombre,
                    cantidad = detalle.Cantidad,
                    total = detalle.Total,
                    efectivo = detalle.Venta.Efectivo,
                    transferencia = detalle.Venta.Transferencia,
                    numeroDeFactura = detalle.Venta.NumeroDeFactura,
                    idProducto = detalle.IdProducto,
                    nombreCliente = detalle.Venta.NombreCliente,
                    nombreProducto = detalle.Producto.NombreProducto
                };
                return Ok(detalleDTO);
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
                var venta = _context.TablaVentas.FirstOrDefault(v => v.IdVenta == detvtadto.idVenta);
                var producto = _context.TablaProductos.FirstOrDefault(p => p.IdProducto == detvtadto.idProducto);

                if (venta == null || producto == null)
                {
                    return BadRequest("La venta o el producto no existen en la base de datos.");
                }

                var detalleDeVenta = new DetalleDeVenta
                {
                    IdVenta = detvtadto.idVenta,
                    IdProducto = detvtadto.idProducto
                };

                _context.TablaDetalleDeVentas.Add(detalleDeVenta);
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
        public ActionResult Update(int id, [FromBody] DetalleDeVentaDto detvtadto)
        {
            var detalleDeVenta = _context.TablaDetalleDeVentas.FirstOrDefault(e => e.IdDetalleVenta == id);
            if (detalleDeVenta == null)
            {
                return NotFound("No existe el detalle para modificar");
            }

            // Verificar si el IdProducto y el IdVenta existen en la base de datos
            var venta = _context.TablaVentas.FirstOrDefault(v => v.IdVenta == detvtadto.idVenta);
            var producto = _context.TablaProductos.FirstOrDefault(p => p.IdProducto == detvtadto.idProducto);

            if (venta == null || producto == null)
            {
                return BadRequest("La venta o el producto no existen en la base de datos.");
            }

            detalleDeVenta.IdVenta = detvtadto.idVenta;
            detalleDeVenta.IdProducto = detvtadto.idProducto;

            try
            {
                _context.TablaDetalleDeVentas.Update(detalleDeVenta);
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

