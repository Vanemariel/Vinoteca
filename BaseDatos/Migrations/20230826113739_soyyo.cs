using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BaseDatos.Migrations
{
    /// <inheritdoc />
    public partial class soyyo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdCompra",
                table: "TablaCajas",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IdVenta",
                table: "TablaCajas",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DetalleCaja",
                columns: table => new
                {
                    IdDetalleCaja = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Monto = table.Column<float>(type: "real", nullable: false),
                    IdCaja = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleCaja", x => x.IdDetalleCaja);
                    table.ForeignKey(
                        name: "FK_DetalleCaja_TablaCajas_IdCaja",
                        column: x => x.IdCaja,
                        principalTable: "TablaCajas",
                        principalColumn: "IdCaja",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TablaCajas_IdVenta",
                table: "TablaCajas",
                column: "IdVenta");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleCaja_IdCaja",
                table: "DetalleCaja",
                column: "IdCaja");

            migrationBuilder.AddForeignKey(
                name: "FK_TablaCajas_TablaCompras_IdVenta",
                table: "TablaCajas",
                column: "IdVenta",
                principalTable: "TablaCompras",
                principalColumn: "IdCompra",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TablaCajas_TablaVentas_IdVenta",
                table: "TablaCajas",
                column: "IdVenta",
                principalTable: "TablaVentas",
                principalColumn: "IdVenta",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TablaCajas_TablaCompras_IdVenta",
                table: "TablaCajas");

            migrationBuilder.DropForeignKey(
                name: "FK_TablaCajas_TablaVentas_IdVenta",
                table: "TablaCajas");

            migrationBuilder.DropTable(
                name: "DetalleCaja");

            migrationBuilder.DropIndex(
                name: "IX_TablaCajas_IdVenta",
                table: "TablaCajas");

            migrationBuilder.DropColumn(
                name: "IdCompra",
                table: "TablaCajas");

            migrationBuilder.DropColumn(
                name: "IdVenta",
                table: "TablaCajas");
        }
    }
}
