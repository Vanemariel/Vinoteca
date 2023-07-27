using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BaseDatos.Migrations
{
    /// <inheritdoc />
    public partial class cuarta : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CantidadVenta",
                table: "TablaDetalleDeVentas");

            migrationBuilder.DropColumn(
                name: "PrecioVenta",
                table: "TablaDetalleDeVentas");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CantidadVenta",
                table: "TablaDetalleDeVentas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "PrecioVenta",
                table: "TablaDetalleDeVentas",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
