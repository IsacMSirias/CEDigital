using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{

    public class GrupoContext : DbContext
    {
        public GrupoContext(DbContextOptions<GrupoContext> options) : base(options)
        {
        }
       

        public DbSet<Grupo> Grupo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Primary Key
            modelBuilder.Entity<Grupo>()
                .HasKey(g => g.IdGrupo);

            // Foreign Keys
            modelBuilder.Entity<Grupo>()
                .HasOne<Semestre>()
                .WithMany()
                .HasForeignKey(s => s.IdSemestre)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Grupo>()
                .HasOne<Curso>()
                .WithMany()
                .HasForeignKey(c => c.IdCurso)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }


}



