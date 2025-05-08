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
            modelBuilder.Entity<Grupo>().HasIndex(c => c.IdGrupo).IsUnique();

        }
    }


}



