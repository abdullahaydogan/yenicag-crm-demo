using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YeniCag.Crm.Core.Entity;

namespace YeniCag.Crm.Persistance.Configurations
{
    public class PaymentInstallmentConfig : IEntityTypeConfiguration<PaymentInstallment>
    {
        public void Configure(EntityTypeBuilder<PaymentInstallment> builder)
        {
            builder.ToTable("payment_installments");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.StudentEnrollmentId)
                .HasColumnName("student_enrollment_id")
                .IsRequired();

            builder.Property(x => x.InstallmentNumber)
                .HasColumnName("installment_number")
                .IsRequired();

            builder.Property(x => x.Amount)
                .HasColumnName("amount")
                .HasColumnType("numeric(18,2)")
                .IsRequired();

            builder.Property(x => x.DueDate)
                .HasColumnName("due_date")
                .IsRequired();

            builder.Property(x => x.IsPaid)
                .HasColumnName("is_paid")
                .HasDefaultValue(false)
                .IsRequired();

            builder.Property(x => x.PaidDate)
                .HasColumnName("paid_date");

            builder.HasOne(x => x.StudentEnrollment)
                .WithMany(x => x.PaymentInstallments)
                .HasForeignKey(x => x.StudentEnrollmentId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(x => new { x.StudentEnrollmentId, x.InstallmentNumber })
                .IsUnique();
        }
    }
}