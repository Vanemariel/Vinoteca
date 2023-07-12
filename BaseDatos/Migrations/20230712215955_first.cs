using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BaseDatos.Migrations
{
    /// <inheritdoc />
    public partial class first : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TablaClientes",
                columns: table => new
                {
                    IdCliente = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Direccion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telefono = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TablaClientes", x => x.IdCliente);
                });

            migrationBuilder.CreateTable(
                name: "TablaProveedores",
                columns: table => new
                {
                    IdProveedor = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HorarioDesde = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HorarioHasta = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telefono = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TablaProveedores", x => x.IdProveedor);
                });

            migrationBuilder.CreateTable(
                name: "TablaUsuarios",
                columns: table => new
                {
                    IdUsuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Apellido = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TablaUsuarios", x => x.IdUsuario);
                });

            migrationBuilder.CreateTable(
                name: "TablaProductos",
                columns: table => new
                {
                    IdProducto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreProducto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Stock = table.Column<int>(type: "int", nullable: false),
                    Detalle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PrecioVenta = table.Column<float>(type: "real", nullable: false),
                    PrecioCompra = table.Column<float>(type: "real", nullable: false),
                    IdProveedor = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TablaProductos", x => x.IdProducto);
                    table.ForeignKey(
                        name: "FK_TablaProductos_TablaProveedores_IdProveedor",
                        column: x => x.IdProveedor,
                        principalTable: "TablaProveedores",
                        principalColumn: "IdProveedor",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TablaCajas",
                columns: table => new
                {
                    IdCaja = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fecha = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Inicio = table.Column<float>(type: "real", nullable: false),
                    Cierre = table.Column<float>(type: "real", nullable: false),
                    IdUsuario = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TablaCajas", x => x.IdCaja);
                    table.ForeignKey(
                        name: "FK_TablaCajas_TablaUsuarios_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "TablaUsuarios",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TablaCompras",
                columns: table => new
                {
                    IdCompra = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FechaCompra = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    efectivo = table.Column<bool>(type: "bit", nullable: false),
                    transferencia = table.Column<bool>(type: "bit", nullable: false),
                    Total = table.Column<float>(type: "real", nullable: false),
                    cantidad = table.Column<int>(type: "int", nullable: false),
                    precio = table.Column<float>(type: "real", nullable: false),
                    IdUsuario = table.Column<int>(type: "int", nullable: false),
                    IdProducto = table.Column<int>(type: "int", nullable: false),
                    IdProveedor = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TablaCompras", x => x.IdCompra);
                    table.ForeignKey(
                        name: "FK_TablaCompras_TablaProveedores_IdProveedor",
                        column: x => x.IdProveedor,
                        principalTable: "TablaProveedores",
                        principalColumn: "IdProveedor",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TablaCompras_TablaUsuarios_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "TablaUsuarios",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TablaCompras_TablaUsuarios_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "TablaUsuarios",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TablaVentas",
                columns: table => new
                {
                    IdVenta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FechaVenta = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    efectivo = table.Column<bool>(type: "bit", nullable: false),
                    transferencia = table.Column<bool>(type: "bit", nullable: false),
                    Total = table.Column<float>(type: "real", nullable: false),
                    cantidad = table.Column<int>(type: "int", nullable: false),
                    precio = table.Column<float>(type: "real", nullable: false),
                    IdProducto = table.Column<int>(type: "int", nullable: false),
                    IdUsuario = table.Column<int>(type: "int", nullable: false),
                    IdCliente = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TablaVentas", x => x.IdVenta);
                    table.ForeignKey(
                        name: "FK_TablaVentas_TablaClientes_IdCliente",
                        column: x => x.IdCliente,
                        principalTable: "TablaClientes",
                        principalColumn: "IdCliente",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TablaVentas_TablaProductos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "TablaProductos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TablaVentas_TablaUsuarios_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "TablaUsuarios",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TablaDetalleDeCajas",
                columns: table => new
                {
                    IdDetalleCaja = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Importe = table.Column<float>(type: "real", nullable: false),
                    Saldo = table.Column<float>(type: "real", nullable: false),
                    IdCaja = table.Column<int>(type: "int", nullable: false),
                    IdCompra = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TablaDetalleDeCajas", x => x.IdDetalleCaja);
                    table.ForeignKey(
                        name: "FK_TablaDetalleDeCajas_TablaCajas_IdCaja",
                        column: x => x.IdCaja,
                        principalTable: "TablaCajas",
                        principalColumn: "IdCaja",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TablaDetalleDeCajas_TablaCompras_IdCompra",
                        column: x => x.IdCompra,
                        principalTable: "TablaCompras",
                        principalColumn: "IdCompra",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TablaDetalleDeCompras",
                columns: table => new
                {
                    IdDetalleCompra = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PrecioCompra = table.Column<float>(type: "real", nullable: false),
                    CantidadCompra = table.Column<int>(type: "int", nullable: false),
                    IdCompra = table.Column<int>(type: "int", nullable: false),
                    IdProducto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TablaDetalleDeCompras", x => x.IdDetalleCompra);
                    table.ForeignKey(
                        name: "FK_TablaDetalleDeCompras_TablaCompras_IdCompra",
                        column: x => x.IdCompra,
                        principalTable: "TablaCompras",
                        principalColumn: "IdCompra",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TablaDetalleDeCompras_TablaProductos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "TablaProductos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TablaDetalleDeVentas",
                columns: table => new
                {
                    IdDetalleVenta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PrecioVenta = table.Column<float>(type: "real", nullable: false),
                    CantidadVenta = table.Column<int>(type: "int", nullable: false),
                    IdVenta = table.Column<int>(type: "int", nullable: false),
                    IdProducto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TablaDetalleDeVentas", x => x.IdDetalleVenta);
                    table.ForeignKey(
                        name: "FK_TablaDetalleDeVentas_TablaProductos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "TablaProductos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TablaDetalleDeVentas_TablaVentas_IdVenta",
                        column: x => x.IdVenta,
                        principalTable: "TablaVentas",
                        principalColumn: "IdVenta",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TablaCajas_IdUsuario",
                table: "TablaCajas",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_TablaCompras_IdProducto",
                table: "TablaCompras",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_TablaCompras_IdProveedor",
                table: "TablaCompras",
                column: "IdProveedor");

            migrationBuilder.CreateIndex(
                name: "IX_TablaCompras_IdUsuario",
                table: "TablaCompras",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_TablaDetalleDeCajas_IdCaja",
                table: "TablaDetalleDeCajas",
                column: "IdCaja");

            migrationBuilder.CreateIndex(
                name: "IX_TablaDetalleDeCajas_IdCompra",
                table: "TablaDetalleDeCajas",
                column: "IdCompra");

            migrationBuilder.CreateIndex(
                name: "IX_TablaDetalleDeCompras_IdCompra",
                table: "TablaDetalleDeCompras",
                column: "IdCompra");

            migrationBuilder.CreateIndex(
                name: "IX_TablaDetalleDeCompras_IdProducto",
                table: "TablaDetalleDeCompras",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_TablaDetalleDeVentas_IdProducto",
                table: "TablaDetalleDeVentas",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_TablaDetalleDeVentas_IdVenta",
                table: "TablaDetalleDeVentas",
                column: "IdVenta");

            migrationBuilder.CreateIndex(
                name: "IX_TablaProductos_IdProveedor",
                table: "TablaProductos",
                column: "IdProveedor");

            migrationBuilder.CreateIndex(
                name: "IX_TablaVentas_IdCliente",
                table: "TablaVentas",
                column: "IdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_TablaVentas_IdProducto",
                table: "TablaVentas",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_TablaVentas_IdUsuario",
                table: "TablaVentas",
                column: "IdUsuario");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TablaDetalleDeCajas");

            migrationBuilder.DropTable(
                name: "TablaDetalleDeCompras");

            migrationBuilder.DropTable(
                name: "TablaDetalleDeVentas");

            migrationBuilder.DropTable(
                name: "TablaCajas");

            migrationBuilder.DropTable(
                name: "TablaCompras");

            migrationBuilder.DropTable(
                name: "TablaVentas");

            migrationBuilder.DropTable(
                name: "TablaClientes");

            migrationBuilder.DropTable(
                name: "TablaProductos");

            migrationBuilder.DropTable(
                name: "TablaUsuarios");

            migrationBuilder.DropTable(
                name: "TablaProveedores");
        }
    }
}
