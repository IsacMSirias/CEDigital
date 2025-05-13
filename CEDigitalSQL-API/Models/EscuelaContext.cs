using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{
    public class EscuelaContext : DbContext
    {
       public EscuelaContext(DbContextOptions<EscuelaContext> options) : base(options)
        {
        }

        public DbSet<Escuela> Escuela { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Primary Key
            modelBuilder.Entity<Escuela>()
                .HasKey(e => e.IdEscuela);
        }
    }
}
