using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playground.Data.Migrations
{
    public partial class autoitemurl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "Item");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Item",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
