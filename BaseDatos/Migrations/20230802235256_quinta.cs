using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BaseDatos.Migrations
{
    /// <inheritdoc />
    public partial class quinta : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TablaVentas_TablaClientes_IdCliente",
                table: "TablaVentas");

            migrationBuilder.DropForeignKey(
                name: "FK_TablaVentas_TablaProductos_IdProducto",
                table: "TablaVentas");

            migrationBuilder.DropIndex(
                name: "IX_TablaVentas_IdCliente",
                table: "TablaVentas");

            migrationBuilder.DropIndex(
                name: "IX_TablaVentas_IdProducto",
                table: "TablaVentas");

            migrationBuilder.DropColumn(
                name: "IdCliente",
                table: "TablaVentas");

            migrationBuilder.DropColumn(
                name: "IdProducto",
                table: "TablaVentas");

            migrationBuilder.DropColumn(
                name: "cantidad",
                table: "TablaVentas");

            migrationBuilder.DropColumn(
                name: "precio",
                table: "TablaVentas");

            migrationBuilder.DropColumn(
                name: "precioVenta",
                table: "TablaVentas");

            migrationBuilder.RenameColumn(
                name: "transferencia",
                table: "TablaVentas",
                newName: "Transferencia");

            migrationBuilder.RenameColumn(
                name: "efectivo",
                table: "TablaVentas",
                newName: "Efectivo");

            migrationBuilder.AddColumn<string>(
                name: "NombreCliente",
                table: "TablaVentas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Cantidad",
                table: "TablaDetalleDeVentas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "Total",
                table: "TablaDetalleDeVentas",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "EgresoProveedores",
                table: "TablaCajas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EgresoRetiro",
                table: "TablaCajas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EgresoSueldo",
                table: "TablaCajas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Ingreso",
                table: "TablaCajas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IngresoDébito",
                table: "TablaCajas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IngresoEfectivo",
                table: "TablaCajas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "MañanaOTarde",
                table: "TablaCajas",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "TipoEgreso",
                table: "TablaCajas",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "TipoIngreso",
                table: "TablaCajas",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NombreCliente",
                table: "TablaVentas");

            migrationBuilder.DropColumn(
                name: "Cantidad",
                table: "TablaDetalleDeVentas");

            migrationBuilder.DropColumn(
                name: "Total",
                table: "TablaDetalleDeVentas");

            migrationBuilder.DropColumn(
                name: "EgresoProveedores",
                table: "TablaCajas");

            migrationBuilder.DropColumn(
                name: "EgresoRetiro",
                table: "TablaCajas");

            migrationBuilder.DropColumn(
                name: "EgresoSueldo",
                table: "TablaCajas");

            migrationBuilder.DropColumn(
                name: "Ingreso",
                table: "TablaCajas");

            migrationBuilder.DropColumn(
                name: "IngresoDébito",
                table: "TablaCajas");

            migrationBuilder.DropColumn(
                name: "IngresoEfectivo",
                table: "TablaCajas");

            migrationBuilder.DropColumn(
                name: "MañanaOTarde",
                table: "TablaCajas");

            migrationBuilder.DropColumn(
                name: "TipoEgreso",
                table: "TablaCajas");

            migrationBuilder.DropColumn(
                name: "TipoIngreso",
                table: "TablaCajas");

            migrationBuilder.RenameColumn(
                name: "Transferencia",
                table: "TablaVentas",
                newName: "transferencia");

            migrationBuilder.RenameColumn(
                name: "Efectivo",
                table: "TablaVentas",
                newName: "efectivo");

            migrationBuilder.AddColumn<int>(
                name: "IdCliente",
                table: "TablaVentas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdProducto",
                table: "TablaVentas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "cantidad",
                table: "TablaVentas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "precio",
                table: "TablaVentas",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "precioVenta",
                table: "TablaVentas",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.CreateIndex(
                name: "IX_TablaVentas_IdCliente",
                table: "TablaVentas",
                column: "IdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_TablaVentas_IdProducto",
                table: "TablaVentas",
                column: "IdProducto");

            migrationBuilder.AddForeignKey(
                name: "FK_TablaVentas_TablaClientes_IdCliente",
                table: "TablaVentas",
                column: "IdCliente",
                principalTable: "TablaClientes",
                principalColumn: "IdCliente",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TablaVentas_TablaProductos_IdProducto",
                table: "TablaVentas",
                column: "IdProducto",
                principalTable: "TablaProductos",
                principalColumn: "IdProducto",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
