using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{

    public class SubgrupoContext : DbContext
    {
        public SubgrupoContext(DbContextOptions<SubgrupoContext> options) : base(options)
        {
        }

        public DbSet<Subgrupo> Subgrupo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Primary Key
            modelBuilder.Entity<Subgrupo>()
                .HasKey(s => s.IdSubgrupo);

            // Foreign Keys
            modelBuilder.Entity<Subgrupo>().
                HasOne<Grupo>()
                .WithMany()
                .HasForeignKey(g => g.IdGrupo)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Subgrupo>().
                HasOne<Evaluacion>()
                .WithMany()
                .HasForeignKey(e => e.IdEvaluacion)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }


}



