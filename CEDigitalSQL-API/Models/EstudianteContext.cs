using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{
    public class EstudianteContext : DbContext
    {
       public EstudianteContext(DbContextOptions<EstudianteContext> options) : base(options)
        {
        }

        public DbSet<Estudiante> Estudiante { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Primary Key
            modelBuilder.Entity<Estudiante>()
                .HasKey(e => e.CarnetEstudiante);
        }
    }
}
