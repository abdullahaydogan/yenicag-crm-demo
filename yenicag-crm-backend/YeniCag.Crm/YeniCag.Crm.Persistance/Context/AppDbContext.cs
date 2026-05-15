using Microsoft.EntityFrameworkCore;
using YeniCag.Crm.Core.Entity;
using YeniCag.Crm.Persistance.Configurations;
using YeniCag.Crm.Persistance.SeedData;

namespace YeniCag.Crm.Persistance.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<Teacher> Teachers { get; set; }

        public DbSet<StudentEnrollment> StudentEnrollments { get; set; }

        public DbSet<PaymentInstallment> PaymentInstallments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new StudentConfig());
            modelBuilder.ApplyConfiguration(new CourseConfig());
            modelBuilder.ApplyConfiguration(new TeacherConfig());
            modelBuilder.ApplyConfiguration(new StudentEnrollmentConfig());
            modelBuilder.ApplyConfiguration(new PaymentInstallmentConfig());

            //SeedDataInitializer.Seed(modelBuilder);
        }
    }
}