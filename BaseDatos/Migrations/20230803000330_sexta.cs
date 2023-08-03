using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BaseDatos.Migrations
{
    /// <inheritdoc />
    public partial class sexta : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "TablaProveedores",
                columns: new[] { "IdProveedor", "Descripcion", "HorarioDesde", "HorarioHasta", "Nombre", "Telefono" },
                values: new object[] { 1, "EL mas capo", "08:00", "18:00", "Jose", 351112312L });

            migrationBuilder.InsertData(
                table: "TablaUsuarios",
                columns: new[] { "IdUsuario", "Apellido", "Nombre" },
                values: new object[] { 1, "Salchicha", "Jose" });

            migrationBuilder.InsertData(
                table: "TablaProductos",
                columns: new[] { "IdProducto", "Detalle", "IdProveedor", "NombreProducto", "PrecioCompra", "PrecioVenta", "Stock" },
                values: new object[,]
                {
                    { 1, "LALALALA COCA", 1, "Coca", 100f, 350f, 15 },
                    { 2, "LALALALA FERNETT", 1, "Fernet", 1000f, 1350f, 15 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "TablaProductos",
                keyColumn: "IdProducto",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "TablaProductos",
                keyColumn: "IdProducto",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "TablaUsuarios",
                keyColumn: "IdUsuario",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "TablaProveedores",
                keyColumn: "IdProveedor",
                keyValue: 1);
        }
    }
}
