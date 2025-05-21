using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{
    public class MatriculaContext : DbContext
    {
       public MatriculaContext(DbContextOptions<MatriculaContext> options) : base(options)
        {
        }

        public DbSet<Matricula> Matricula { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // (Super Key)
            modelBuilder.Entity<Matricula>()
                .HasKey(m => new { m.CarnetEstudiante, m.IdGrupo });

            // Foreign Keys
            modelBuilder.Entity<Matricula>().
                HasOne<Estudiante>()
                .WithMany()
                .HasForeignKey(e => e.IdEstudiante)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Matricula>().
                HasOne<Grupo>()
                .WithMany()
                .HasForeignKey(g => g.IdGrupo)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
