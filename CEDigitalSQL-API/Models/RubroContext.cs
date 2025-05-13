using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{
    public class RubroContext : DbContext
    {
       public RubroContext(DbContextOptions<RubroContext> options) : base(options)
        {
        }

        public DbSet<Rubro> Rubro { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Primary Key
            modelBuilder.Entity<Rubro>()
                .HasKey(r => r.IdRubro);

            // Foreign Keys
            modelBuilder.Entity<Rubro>()
                .HasOne<Grupo>()
                .WithMany()
                .HasForeignKey(g => g.IdGrupo)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
