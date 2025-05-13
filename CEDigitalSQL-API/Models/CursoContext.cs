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

            // Primary Key
            modelBuilder.Entity<Curso>()
                .HasKey(c => c.IdCurso);

            // Foreign Key
            modelBuilder.Entity<Curso>()
                .HasOne<Escuela>()
                .WithMany()
                .HasForeignKey(e => e.IdEscuela)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
