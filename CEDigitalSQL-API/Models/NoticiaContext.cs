using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{

    public class NoticiaContext : DbContext
    {
        public NoticiaContext(DbContextOptions<NoticiaContext> options) : base(options)
        {
        }
       

        public DbSet<Noticia> Noticia { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Primary Key
            modelBuilder.Entity<Noticia>()
                .HasKey(n => n.IdNoticia);

            // Foreign Keys
            modelBuilder.Entity<Noticia>()
                .HasOne<Profesor>()
                .WithMany()
                .HasForeignKey(p => p.CedulaProfesor)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Noticia>()
                .HasOne<Grupo>()
                .WithMany()
                .HasForeignKey(g => g.IdGrupo)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }


}



