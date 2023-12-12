using BaseDatos.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared.DTO;
using Vinoteca.BaseDatos;
using Vinoteca.Server.Contracts;
using static Vinoteca.Server.Contracts.ApiRoutes;
using DetalleDeCompra = BaseDatos.Entidades.DetalleDeCompra;

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
        public async Task<ActionResult<List<DetalleDeCompraDto>>> GetAll()
        {
            try
            {
                List<DetalleDeCompra> detCompras = await this._context.TablaDetalleDeCompras
                    .Include(detCompras => detCompras.Producto)
                        .ThenInclude(Compra => Compra.Proveedor)
                    .Include(detCompras => detCompras.Compra)
                        .ThenInclude(Compra => Compra.Usuario)
                    .ToListAsync();
                var mappedData = detCompras.Select(detalleULTRA => new DetalleDeCompraDto
                {
                    idDetalleCompra = detalleULTRA.IdDetalleCompra,
                    fechaCompra = detalleULTRA?.Compra?.FechaCompra,
                    idCompra = detalleULTRA.IdCompra,
                    nombreUsuario = detalleULTRA?.Compra?.Usuario?.Nombre,
                    cantidad = detalleULTRA.Cantidad,
                    total = detalleULTRA.Total,
                    efectivo = detalleULTRA.Compra.Efectivo,
                    transferencia = detalleULTRA.Compra.Transferencia,
                    numeroDeFactura = detalleULTRA?.Compra?.NumeroDeFactura,
                    idProducto = detalleULTRA.IdProducto,
                    nombreProveedores = detalleULTRA?.Compra?.Proveedor?.Nombre,
                    nombreProducto = detalleULTRA?.Producto?.NombreProducto
                }).ToList();
                return Ok(mappedData);
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
                var detalleULTRA = await this._context.TablaDetalleDeCompras
                    .Include(detalleULTRA => detalleULTRA.Producto)
                      .Include(detalleULTRA => detalleULTRA.Compra)
                      .FirstOrDefaultAsync(detalleULTRA => detalleULTRA.IdDetalleCompra == id);

                if (detalleULTRA == null)
                {
                    return NotFound();
                }
                var onice = new DetalleDeCompraDto
                {
                    fechaCompra = detalleULTRA.Compra?.FechaCompra,
                    idCompra = detalleULTRA.IdCompra,
                    nombreUsuario = detalleULTRA.Compra.Usuario.Nombre,
                    cantidad = detalleULTRA.Cantidad,
                    total = detalleULTRA.Total,
                    efectivo = detalleULTRA.Compra.Efectivo,
                    transferencia = detalleULTRA.Compra.Transferencia,
                    numeroDeFactura = detalleULTRA.Compra.NumeroDeFactura,
                    idProducto = detalleULTRA.IdProducto,
                    nombreProveedores = detalleULTRA.Compra.Proveedor.Nombre,
                    nombreProducto = detalleULTRA.Producto.NombreProducto
                };
                return Ok(onice);
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
                // Verificar si el IdProducto y el IdCompra existen en la base de datos
                var compra = _context.TablaCompras.FirstOrDefault(v => v.IdCompra == DetalleDeCompraDTO.idCompra);
                var productol = _context.TablaProductos.FirstOrDefault(p => p.IdProducto == DetalleDeCompraDTO.idProducto);

                if (compra == null || productol == null)
                {
                    return BadRequest("La compra o el producto no existen en la base de datos.");
                }
                // Crear un nuevo objeto DetalleDeVenta
                var detalleDeCOMPRAS = new DetalleDeCompra
                {
                    IdCompra =DetalleDeCompraDTO.idCompra,
                    IdProducto = DetalleDeCompraDTO.idProducto
                };

                // Agregar el detalle de compra a la tabla correspondiente
                _context.TablaDetalleDeCompras.Add(detalleDeCOMPRAS);
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
        public ActionResult Update(int id, [FromBody] DetalleDeCompraDto detalleDeCompra)
        {
            var detDC = _context.TablaDetalleDeCompras.FirstOrDefault(e => e.IdDetalleCompra == id);
            if (detDC==null)
            {
                return NotFound("No existe detalle para modificar");
            }
            // Verificar si el IdProducto y el IdCompra existen en la base de datos
            var compra1 = _context.TablaCompras.Where(e => e.IdCompra == detalleDeCompra.idCompra);
            var producto43 = _context.TablaProductos.FirstOrDefault(p => p.IdProducto == detalleDeCompra.idProducto);

            if (compra1 == null || producto43 == null)
            {
                return BadRequest("No existe la compra o producto en la base de datos");
            }

            detDC.IdCompra = detDC.IdCompra;
            detDC.IdProducto = detDC.IdProducto;

            try
            {
                _context.TablaDetalleDeCompras.Update(detDC);
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

