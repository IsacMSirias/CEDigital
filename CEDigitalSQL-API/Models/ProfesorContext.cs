using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{
    public class ProfesorContext : DbContext
    {
       public ProfesorContext(DbContextOptions<ProfesorContext> options) : base(options)
        {
        }

        public DbSet<Profesor> Profesor { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Primary Key
            modelBuilder.Entity<Profesor>()
                .HasKey(p => p.CedulaProfesor);

        }
    }
}
