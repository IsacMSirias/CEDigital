using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{
    public class CursoContext : DbContext
    {
       public CursoContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Cursos> Cursos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Cursos>().HasIndex(c => c.NombreCurso).IsUnique();

        }
    }
}
