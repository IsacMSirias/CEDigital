using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{
    public class IntegranteSubgrupoContext : DbContext
    {
       public IntegranteSubgrupoContext(DbContextOptions<IntegranteSubgrupoContext> options) : base(options)
        {
        }

        public DbSet<IntegranteSubgrupo> IntegranteSubgrupos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // (Super Key)
            modelBuilder.Entity<IntegranteSubgrupo>()
                .HasKey(intSub => new { intSub.IdSubgrupo, intSub.CarnetEstudiante });

            // Foreign Keys
            modelBuilder.Entity<IntegranteSubgrupo>().
                HasOne<Estudiante>()
                .WithMany()
                .HasForeignKey(e => e.CarnetEstudiante)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<IntegranteSubgrupo>().
                HasOne<Subgrupo>()
                .WithMany()
                .HasForeignKey(s => s.IdSubgrupo)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
