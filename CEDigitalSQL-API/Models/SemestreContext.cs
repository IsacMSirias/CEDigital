using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{

    public class SemestreContext : DbContext
    {
        public SemestreContext(DbContextOptions<SemestreContext> options) : base(options)
        {
        }
       

        public DbSet<Semestre> Semestres { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Semestre>().HasIndex(c => c.NombreCurso).IsUnique();

        }
    }


}



