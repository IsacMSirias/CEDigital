using Microsoft.EntityFrameworkCore;

namespace CEDigitalSQL_API.Models
{

    public class SemestreContext : DbContext
    {
        public SemestreContext(DbContextOptions<SemestreContext> options) : base(options)
        {
        }
       

        public DbSet<Semestre> Semestre { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Primary Key
            modelBuilder.Entity<Semestre>()
                .HasKey(s => s.IdSemestre);

        }
    }


}



