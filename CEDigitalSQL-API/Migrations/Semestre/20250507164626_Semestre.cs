using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CEDigitalSQL_API.Migrations.Semestre
{
    /// <inheritdoc />
    public partial class Semestre : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Semestres",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreCurso = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Creditos = table.Column<int>(type: "int", nullable: false),
                    Grupo = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Semestres", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Semestres_NombreCurso",
                table: "Semestres",
                column: "NombreCurso",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Semestres");
        }
    }
}
