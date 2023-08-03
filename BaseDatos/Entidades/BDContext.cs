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


            modelBuilder.Entity<Usuario>().HasData(
              new Usuario
              {
                  IdUsuario = 1,
                 Apellido = "Salchicha",
                 Nombre= "Jose",
                 Compras = new List<Compra>()
              }
            );
            
            modelBuilder.Entity<Proveedor>().HasData(
               new Proveedor
               {
                    IdProveedor = 1,
                    Descripcion = "EL mas capo",
                    HorarioDesde = "08:00",
                    HorarioHasta= "18:00",
                    Nombre = "Jose",
                    Telefono = 351112312,
                    Productos = new List<Producto>()
               }
            );
  
            modelBuilder.Entity<Producto>().HasData(
              new Producto
              {
                    IdProducto = 1,
                    NombreProducto = "Coca",
                    Stock = 15,
                    Detalle = "LALALALA COCA",
                    PrecioVenta = 350,
                    PrecioCompra = 100,
                    IdProveedor = 1,
                    DetallesCompra = new List<DetalleDeCompra>()
              },
              new Producto
              {
                  IdProducto = 2,
                  NombreProducto = "Fernet",
                  Stock = 15,
                  Detalle = "LALALALA FERNETT",
                  PrecioVenta = 1350,
                  PrecioCompra = 1000,
                  IdProveedor = 1,
                  DetallesCompra = new List<DetalleDeCompra>()
              }
            );
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