﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Vinoteca.BaseDatos;

#nullable disable

namespace BaseDatos.Migrations
{
    [DbContext(typeof(BDContext))]
    [Migration("20230727232831_cuarta")]
    partial class cuarta
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BaseDatos.Entidades.Caja", b =>
                {
                    b.Property<int>("IdCaja")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdCaja"));

                    b.Property<float>("Cierre")
                        .HasColumnType("real");

                    b.Property<string>("Fecha")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.Property<float>("Inicio")
                        .HasColumnType("real");

                    b.HasKey("IdCaja");

                    b.HasIndex("IdUsuario");

                    b.ToTable("TablaCajas");
                });

            modelBuilder.Entity("BaseDatos.Entidades.Cliente", b =>
                {
                    b.Property<int>("IdCliente")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdCliente"));

                    b.Property<string>("Direccion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("Telefono")
                        .HasColumnType("bigint");

                    b.HasKey("IdCliente");

                    b.ToTable("TablaClientes");
                });

            modelBuilder.Entity("BaseDatos.Entidades.Compra", b =>
                {
                    b.Property<int>("IdCompra")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdCompra"));

                    b.Property<string>("FechaCompra")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdProducto")
                        .HasColumnType("int");

                    b.Property<int>("IdProveedor")
                        .HasColumnType("int");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.Property<string>("NumeroDeFactura")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Total")
                        .HasColumnType("real");

                    b.Property<int>("cantidad")
                        .HasColumnType("int");

                    b.Property<bool>("efectivo")
                        .HasColumnType("bit");

                    b.Property<float>("precio")
                        .HasColumnType("real");

                    b.Property<float>("precioCompra")
                        .HasColumnType("real");

                    b.Property<bool>("transferencia")
                        .HasColumnType("bit");

                    b.HasKey("IdCompra");

                    b.HasIndex("IdProducto");

                    b.HasIndex("IdProveedor");

                    b.HasIndex("IdUsuario");

                    b.ToTable("TablaCompras");
                });

            modelBuilder.Entity("BaseDatos.Entidades.DetalleDeCaja", b =>
                {
                    b.Property<int>("IdDetalleCaja")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdDetalleCaja"));

                    b.Property<int>("IdCaja")
                        .HasColumnType("int");

                    b.Property<int?>("IdCompra")
                        .HasColumnType("int");

                    b.Property<float>("Importe")
                        .HasColumnType("real");

                    b.Property<float>("Saldo")
                        .HasColumnType("real");

                    b.HasKey("IdDetalleCaja");

                    b.HasIndex("IdCaja");

                    b.HasIndex("IdCompra");

                    b.ToTable("TablaDetalleDeCajas");
                });

            modelBuilder.Entity("BaseDatos.Entidades.DetalleDeCompra", b =>
                {
                    b.Property<int>("IdDetalleCompra")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdDetalleCompra"));

                    b.Property<int>("CantidadCompra")
                        .HasColumnType("int");

                    b.Property<int>("IdCompra")
                        .HasColumnType("int");

                    b.Property<int>("IdProducto")
                        .HasColumnType("int");

                    b.Property<float>("PrecioCompra")
                        .HasColumnType("real");

                    b.HasKey("IdDetalleCompra");

                    b.HasIndex("IdCompra");

                    b.HasIndex("IdProducto");

                    b.ToTable("TablaDetalleDeCompras");
                });

            modelBuilder.Entity("BaseDatos.Entidades.DetalleDeVenta", b =>
                {
                    b.Property<int>("IdDetalleVenta")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdDetalleVenta"));

                    b.Property<int>("IdProducto")
                        .HasColumnType("int");

                    b.Property<int>("IdVenta")
                        .HasColumnType("int");

                    b.HasKey("IdDetalleVenta");

                    b.HasIndex("IdProducto");

                    b.HasIndex("IdVenta");

                    b.ToTable("TablaDetalleDeVentas");
                });

            modelBuilder.Entity("BaseDatos.Entidades.Producto", b =>
                {
                    b.Property<int>("IdProducto")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdProducto"));

                    b.Property<string>("Detalle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdProveedor")
                        .HasColumnType("int");

                    b.Property<string>("NombreProducto")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("PrecioCompra")
                        .HasColumnType("real");

                    b.Property<float>("PrecioVenta")
                        .HasColumnType("real");

                    b.Property<int>("Stock")
                        .HasColumnType("int");

                    b.HasKey("IdProducto");

                    b.HasIndex("IdProveedor");

                    b.ToTable("TablaProductos");
                });

            modelBuilder.Entity("BaseDatos.Entidades.Proveedor", b =>
                {
                    b.Property<int>("IdProveedor")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdProveedor"));

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HorarioDesde")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HorarioHasta")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("Telefono")
                        .HasColumnType("bigint");

                    b.HasKey("IdProveedor");

                    b.ToTable("TablaProveedores");
                });

            modelBuilder.Entity("BaseDatos.Entidades.Venta", b =>
                {
                    b.Property<int>("IdVenta")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdVenta"));

                    b.Property<string>("FechaVenta")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdCliente")
                        .HasColumnType("int");

                    b.Property<int>("IdProducto")
                        .HasColumnType("int");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.Property<string>("NumeroDeFactura")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Total")
                        .HasColumnType("real");

                    b.Property<int>("cantidad")
                        .HasColumnType("int");

                    b.Property<bool>("efectivo")
                        .HasColumnType("bit");

                    b.Property<float>("precio")
                        .HasColumnType("real");

                    b.Property<float>("precioVenta")
                        .HasColumnType("real");

                    b.Property<bool>("transferencia")
                        .HasColumnType("bit");

                    b.HasKey("IdVenta");

                    b.HasIndex("IdCliente");

                    b.HasIndex("IdProducto");

                    b.HasIndex("IdUsuario");

                    b.ToTable("TablaVentas");
                });

            modelBuilder.Entity("Vinoteca.BaseDatos.Entidades.Usuario", b =>
                {
                    b.Property<int>("IdUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdUsuario"));

                    b.Property<string>("Apellido")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdUsuario");

                    b.ToTable("TablaUsuarios");
                });

            modelBuilder.Entity("BaseDatos.Entidades.Caja", b =>
                {
                    b.HasOne("Vinoteca.BaseDatos.Entidades.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("BaseDatos.Entidades.Compra", b =>
                {
                    b.HasOne("Vinoteca.BaseDatos.Entidades.Usuario", "Producto")
                        .WithMany()
                        .HasForeignKey("IdProducto")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BaseDatos.Entidades.Proveedor", "Proveedor")
                        .WithMany()
                        .HasForeignKey("IdProveedor")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Vinoteca.BaseDatos.Entidades.Usuario", "Usuario")
                        .WithMany("Compras")
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Producto");

                    b.Navigation("Proveedor");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("BaseDatos.Entidades.DetalleDeCaja", b =>
                {
                    b.HasOne("BaseDatos.Entidades.Caja", "Caja")
                        .WithMany("DetalleDeCajas")
                        .HasForeignKey("IdCaja")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BaseDatos.Entidades.Compra", "Compra")
                        .WithMany()
                        .HasForeignKey("IdCompra")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Caja");

                    b.Navigation("Compra");
                });

            modelBuilder.Entity("BaseDatos.Entidades.DetalleDeCompra", b =>
                {
                    b.HasOne("BaseDatos.Entidades.Compra", "Compra")
                        .WithMany("DetalleDeCompras")
                        .HasForeignKey("IdCompra")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BaseDatos.Entidades.Producto", "Producto")
                        .WithMany("DetallesCompra")
                        .HasForeignKey("IdProducto")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Compra");

                    b.Navigation("Producto");
                });

            modelBuilder.Entity("BaseDatos.Entidades.DetalleDeVenta", b =>
                {
                    b.HasOne("BaseDatos.Entidades.Producto", "Producto")
                        .WithMany()
                        .HasForeignKey("IdProducto")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BaseDatos.Entidades.Venta", "Venta")
                        .WithMany("DetalleDeVentas")
                        .HasForeignKey("IdVenta")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Producto");

                    b.Navigation("Venta");
                });

            modelBuilder.Entity("BaseDatos.Entidades.Producto", b =>
                {
                    b.HasOne("BaseDatos.Entidades.Proveedor", "Proveedor")
                        .WithMany("Productos")
                        .HasForeignKey("IdProveedor")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Proveedor");
                });

            modelBuilder.Entity("BaseDatos.Entidades.Venta", b =>
                {
                    b.HasOne("BaseDatos.Entidades.Cliente", "Cliente")
                        .WithMany()
                        .HasForeignKey("IdCliente")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BaseDatos.Entidades.Producto", "Producto")
                        .WithMany()
                        .HasForeignKey("IdProducto")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Vinoteca.BaseDatos.Entidades.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Cliente");

                    b.Navigation("Producto");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("BaseDatos.Entidades.Caja", b =>
                {
                    b.Navigation("DetalleDeCajas");
                });

            modelBuilder.Entity("BaseDatos.Entidades.Compra", b =>
                {
                    b.Navigation("DetalleDeCompras");
                });

            modelBuilder.Entity("BaseDatos.Entidades.Producto", b =>
                {
                    b.Navigation("DetallesCompra");
                });

            modelBuilder.Entity("BaseDatos.Entidades.Proveedor", b =>
                {
                    b.Navigation("Productos");
                });

            modelBuilder.Entity("BaseDatos.Entidades.Venta", b =>
                {
                    b.Navigation("DetalleDeVentas");
                });

            modelBuilder.Entity("Vinoteca.BaseDatos.Entidades.Usuario", b =>
                {
                    b.Navigation("Compras");
                });
#pragma warning restore 612, 618
        }
    }
}
