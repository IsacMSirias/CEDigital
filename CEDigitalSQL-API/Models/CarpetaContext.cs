using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{
    public class CarpetaContext : DbContext
    {
       public CarpetaContext(DbContextOptions<CarpetaContext> options) : base(options)
        {
        }

        public DbSet<Carpeta> Carpeta { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Primary Key
            modelBuilder.Entity<Carpeta>()
                .HasKey(c => c.IdCarpeta);

            // Foreign Keys
            modelBuilder.Entity<Carpeta>()
                .HasOne<Profesor>()
                .WithMany()
                .HasForeignKey(p => p.CedulaProfesor)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Carpeta>()
                .HasOne<Grupo>()
                .WithMany()
                .HasForeignKey(g => g.IdGrupo)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
