using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YeniCag.Crm.Core.Entity;

namespace YeniCag.Crm.Persistance.Configurations
{
    public class StudentEnrollmentConfig : IEntityTypeConfiguration<StudentEnrollment>
    {
        public void Configure(EntityTypeBuilder<StudentEnrollment> builder)
        {
            builder.ToTable("student_enrollments");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.StudentId)
                .HasColumnName("student_id")
                .IsRequired();

            builder.Property(x => x.CourseId)
                .HasColumnName("course_id")
                .IsRequired();

            builder.Property(x => x.CoursePrice)
                .HasColumnName("course_price")
                .HasColumnType("numeric(18,2)")
                .IsRequired();

            builder.Property(x => x.DiscountAmount)
                .HasColumnName("discount_amount")
                .HasColumnType("numeric(18,2)")
                .HasDefaultValue(0)
                .IsRequired();

            builder.Property(x => x.NetAmount)
                .HasColumnName("net_amount")
                .HasColumnType("numeric(18,2)")
                .IsRequired();

            builder.Property(x => x.InstallmentCount)
                .HasColumnName("installment_count")
                .IsRequired();

            builder.Property(x => x.EnrollmentDate)
                .HasColumnName("enrollment_date")
                .IsRequired();

            builder.Property(x => x.IsActive)
                .HasColumnName("is_active")
                .HasDefaultValue(true)
                .IsRequired();

            builder.HasOne(x => x.Student)
                .WithMany(x => x.Enrollments)
                .HasForeignKey(x => x.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Course)
                .WithMany(x => x.Enrollments)
                .HasForeignKey(x => x.CourseId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(x => new { x.StudentId, x.CourseId });
        }
    }
}