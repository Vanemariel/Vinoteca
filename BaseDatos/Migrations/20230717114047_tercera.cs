using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BaseDatos.Migrations
{
    /// <inheritdoc />
    public partial class tercera : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NumeroDeFactura",
                table: "TablaVentas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NumeroDeFactura",
                table: "TablaCompras",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumeroDeFactura",
                table: "TablaVentas");

            migrationBuilder.DropColumn(
                name: "NumeroDeFactura",
                table: "TablaCompras");
        }
    }
}
