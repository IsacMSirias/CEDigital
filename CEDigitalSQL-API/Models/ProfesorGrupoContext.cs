using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{
    public class ProfesorGrupoContext : DbContext
    {
        public ProfesorGrupoContext(DbContextOptions<ProfesorGrupoContext> options) : base(options)
        {
        }

        public DbSet<ProfesorGrupo> ProfesorGrupo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // (Super Key)
            modelBuilder.Entity<ProfesorGrupo>()
                .HasKey(pg => new { pg.CedulaProfesor, pg.IdGrupo });

            // Foreign Keys
            modelBuilder.Entity<ProfesorGrupo>().
                HasOne<Profesor>()
                .WithMany()
                .HasForeignKey(p => p.CedulaProfesor)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ProfesorGrupo>().
                HasOne<Grupo>()
                .WithMany()
                .HasForeignKey(g => g.IdGrupo)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}