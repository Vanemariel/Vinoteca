using BaseDatos.Entidades;
using Microsoft.EntityFrameworkCore;
using Vinoteca.BaseDatos.Entidades;

namespace Vinoteca.BaseDatos
{
    public class BDContext : DbContext
    {
        public BDContext(DbContextOptions<BDContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            foreach ( /// Desactiva la eliminacion en cascada de todas las relaciones
                var relationship in modelBuilder.Model.GetEntityTypes()
                .SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }


        public DbSet<Caja> TablaCajas { get; set; }
        public DbSet<Cliente> TablaClientes { get; set; }
        public DbSet<Compra> TablaCompras { get; set; }
        public DbSet<DetalleDeCaja> TablaDetalleDeCajas { get; set; }
        public DbSet<DetalleDeCompra> TablaDetalleDeCompras { get; set; }
        public DbSet<DetalleDeVenta> TablaDetalleDeVentas { get; set; }
        public DbSet<Producto> TablaProductos { get; set; }
        //public DbSet<ProductoProveedor> TablaProductosProveedores { get; set; }
        public DbSet<Proveedor> TablaProveedores { get; set; }
        public DbSet<Usuario> TablaUsuarios { get; set; }
        public DbSet<Venta> TablaVentas { get; set; }

    }
}