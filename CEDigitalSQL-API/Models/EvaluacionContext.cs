using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{
    public class EvaluacionContext : DbContext
    {
       public EvaluacionContext(DbContextOptions<EvaluacionContext> options) : base(options)
        {
        }

        public DbSet<Evaluacion> Evaluacion { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Primary Key
            modelBuilder.Entity<Evaluacion>()
                .HasKey(e => e.IdEvaluacion);

            // Foreign Keys
            modelBuilder.Entity<Evaluacion>()
                .HasOne<Rubro>()
                .WithMany()
                .HasForeignKey(r => r.IdRubro)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
