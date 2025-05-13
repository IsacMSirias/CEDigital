using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{
    public class ArchivoContext : DbContext
    {
       public ArchivoContext(DbContextOptions<ArchivoContext> options) : base(options)
        {
        }

        public DbSet<Archivo> Archivo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Primary Key
            modelBuilder.Entity<Archivo>()
                .HasKey(a => a.IdArchivo);

            // Foreign Keys
            modelBuilder.Entity<Archivo>()
                .HasOne<Estudiante>()
                .WithMany()
                .HasForeignKey(e => e.CarnetEstudiante)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Archivo>()
                .HasOne<Profesor>()
                .WithMany()
                .HasForeignKey(p => p.CedulaProfesor)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
