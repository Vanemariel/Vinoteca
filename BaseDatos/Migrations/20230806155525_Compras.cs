using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BaseDatos.Migrations
{
    /// <inheritdoc />
    public partial class Compras : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TablaCompras_TablaProveedores_IdProveedor",
                table: "TablaCompras");

            migrationBuilder.DropForeignKey(
                name: "FK_TablaCompras_TablaUsuarios_IdProducto",
                table: "TablaCompras");

            migrationBuilder.DropIndex(
                name: "IX_TablaCompras_IdProducto",
                table: "TablaCompras");

            migrationBuilder.DropIndex(
                name: "IX_TablaCompras_IdProveedor",
                table: "TablaCompras");

            migrationBuilder.DropColumn(
                name: "IdProducto",
                table: "TablaCompras");

            migrationBuilder.DropColumn(
                name: "cantidad",
                table: "TablaCompras");

            migrationBuilder.DropColumn(
                name: "precio",
                table: "TablaCompras");

            migrationBuilder.DropColumn(
                name: "precioCompra",
                table: "TablaCompras");

            migrationBuilder.RenameColumn(
                name: "PrecioCompra",
                table: "TablaDetalleDeCompras",
                newName: "Total");

            migrationBuilder.RenameColumn(
                name: "CantidadCompra",
                table: "TablaDetalleDeCompras",
                newName: "Cantidad");

            migrationBuilder.AddColumn<string>(
                name: "Proveedor",
                table: "TablaCompras",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Proveedor",
                table: "TablaCompras");

            migrationBuilder.RenameColumn(
                name: "Total",
                table: "TablaDetalleDeCompras",
                newName: "PrecioCompra");

            migrationBuilder.RenameColumn(
                name: "Cantidad",
                table: "TablaDetalleDeCompras",
                newName: "CantidadCompra");

            migrationBuilder.AddColumn<int>(
                name: "IdProducto",
                table: "TablaCompras",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "cantidad",
                table: "TablaCompras",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "precio",
                table: "TablaCompras",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "precioCompra",
                table: "TablaCompras",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.CreateIndex(
                name: "IX_TablaCompras_IdProducto",
                table: "TablaCompras",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_TablaCompras_IdProveedor",
                table: "TablaCompras",
                column: "IdProveedor");

            migrationBuilder.AddForeignKey(
                name: "FK_TablaCompras_TablaProveedores_IdProveedor",
                table: "TablaCompras",
                column: "IdProveedor",
                principalTable: "TablaProveedores",
                principalColumn: "IdProveedor",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TablaCompras_TablaUsuarios_IdProducto",
                table: "TablaCompras",
                column: "IdProducto",
                principalTable: "TablaUsuarios",
                principalColumn: "IdUsuario",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
