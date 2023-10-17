using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BaseDatos.Migrations
{
    /// <inheritdoc />
    public partial class _1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetalleCaja_TablaCajas_IdCaja",
                table: "DetalleCaja");

            migrationBuilder.DropForeignKey(
                name: "FK_TablaCajas_TablaCompras_IdVenta",
                table: "TablaCajas");

            migrationBuilder.DropForeignKey(
                name: "FK_TablaCajas_TablaVentas_IdVenta",
                table: "TablaCajas");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DetalleCaja",
                table: "DetalleCaja");

            migrationBuilder.DropColumn(
                name: "IdCompra",
                table: "TablaCajas");

            migrationBuilder.DropColumn(
                name: "Monto",
                table: "DetalleCaja");

            migrationBuilder.RenameTable(
                name: "DetalleCaja",
                newName: "TablaDetalleDeCaja");

            migrationBuilder.RenameColumn(
                name: "IdVenta",
                table: "TablaCajas",
                newName: "IdDetalleCaja");

            migrationBuilder.RenameIndex(
                name: "IX_TablaCajas_IdVenta",
                table: "TablaCajas",
                newName: "IX_TablaCajas_IdDetalleCaja");

            migrationBuilder.RenameIndex(
                name: "IX_DetalleCaja_IdCaja",
                table: "TablaDetalleDeCaja",
                newName: "IX_TablaDetalleDeCaja_IdCaja");

            migrationBuilder.AddColumn<int>(
                name: "IdDetalleCaja",
                table: "TablaVentas",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IdDetalleCaja",
                table: "TablaCompras",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TablaDetalleDeCaja",
                table: "TablaDetalleDeCaja",
                column: "IdDetalleCaja");

            migrationBuilder.CreateIndex(
                name: "IX_TablaVentas_IdDetalleCaja",
                table: "TablaVentas",
                column: "IdDetalleCaja");

            migrationBuilder.CreateIndex(
                name: "IX_TablaCompras_IdDetalleCaja",
                table: "TablaCompras",
                column: "IdDetalleCaja");

            migrationBuilder.AddForeignKey(
                name: "FK_TablaCajas_TablaDetalleDeCaja_IdDetalleCaja",
                table: "TablaCajas",
                column: "IdDetalleCaja",
                principalTable: "TablaDetalleDeCaja",
                principalColumn: "IdDetalleCaja",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TablaCompras_TablaDetalleDeCaja_IdDetalleCaja",
                table: "TablaCompras",
                column: "IdDetalleCaja",
                principalTable: "TablaDetalleDeCaja",
                principalColumn: "IdDetalleCaja",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TablaDetalleDeCaja_TablaCajas_IdCaja",
                table: "TablaDetalleDeCaja",
                column: "IdCaja",
                principalTable: "TablaCajas",
                principalColumn: "IdCaja",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TablaVentas_TablaDetalleDeCaja_IdDetalleCaja",
                table: "TablaVentas",
                column: "IdDetalleCaja",
                principalTable: "TablaDetalleDeCaja",
                principalColumn: "IdDetalleCaja",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TablaCajas_TablaDetalleDeCaja_IdDetalleCaja",
                table: "TablaCajas");

            migrationBuilder.DropForeignKey(
                name: "FK_TablaCompras_TablaDetalleDeCaja_IdDetalleCaja",
                table: "TablaCompras");

            migrationBuilder.DropForeignKey(
                name: "FK_TablaDetalleDeCaja_TablaCajas_IdCaja",
                table: "TablaDetalleDeCaja");

            migrationBuilder.DropForeignKey(
                name: "FK_TablaVentas_TablaDetalleDeCaja_IdDetalleCaja",
                table: "TablaVentas");

            migrationBuilder.DropIndex(
                name: "IX_TablaVentas_IdDetalleCaja",
                table: "TablaVentas");

            migrationBuilder.DropIndex(
                name: "IX_TablaCompras_IdDetalleCaja",
                table: "TablaCompras");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TablaDetalleDeCaja",
                table: "TablaDetalleDeCaja");

            migrationBuilder.DropColumn(
                name: "IdDetalleCaja",
                table: "TablaVentas");

            migrationBuilder.DropColumn(
                name: "IdDetalleCaja",
                table: "TablaCompras");

            migrationBuilder.RenameTable(
                name: "TablaDetalleDeCaja",
                newName: "DetalleCaja");

            migrationBuilder.RenameColumn(
                name: "IdDetalleCaja",
                table: "TablaCajas",
                newName: "IdVenta");

            migrationBuilder.RenameIndex(
                name: "IX_TablaCajas_IdDetalleCaja",
                table: "TablaCajas",
                newName: "IX_TablaCajas_IdVenta");

            migrationBuilder.RenameIndex(
                name: "IX_TablaDetalleDeCaja_IdCaja",
                table: "DetalleCaja",
                newName: "IX_DetalleCaja_IdCaja");

            migrationBuilder.AddColumn<int>(
                name: "IdCompra",
                table: "TablaCajas",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Monto",
                table: "DetalleCaja",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DetalleCaja",
                table: "DetalleCaja",
                column: "IdDetalleCaja");

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleCaja_TablaCajas_IdCaja",
                table: "DetalleCaja",
                column: "IdCaja",
                principalTable: "TablaCajas",
                principalColumn: "IdCaja",
                onDelete: ReferentialAction.Restrict);

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
    }
}
