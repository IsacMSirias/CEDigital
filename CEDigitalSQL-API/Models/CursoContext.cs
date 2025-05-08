using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{
    public class CursoContext : DbContext
    {
       public CursoContext(DbContextOptions<CursoContext> options) : base(options)
        {
        }

        public DbSet<Curso> Curso { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Curso>().HasIndex(c => c.IdCurso).IsUnique();

        }
    }
}
