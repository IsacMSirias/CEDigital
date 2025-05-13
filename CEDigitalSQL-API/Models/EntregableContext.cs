using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{
    public class EntregableContext : DbContext
    {
       public EntregableContext(DbContextOptions<EntregableContext> options) : base(options)
        {
        }

        public DbSet<Entregable> Entregable { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Primary Key
            modelBuilder.Entity<Entregable>()
                .HasKey(e => e.IdEntregable);

            // Foreign Keys
            modelBuilder.Entity<Entregable>()
                .HasOne<Archivo>()
                .WithMany()
                .HasForeignKey(a => a.IdArchivoEntrega)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Entregable>()
                .HasOne<Archivo>()
                .WithMany()
                .HasForeignKey(a => a.IdArchivoDesglose)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Entregable>()
                .HasOne<Evaluacion>()
                .WithMany()
                .HasForeignKey(e => e.IdEvaluacion)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
