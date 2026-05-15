namespace YeniCag.Crm.Core.Entity
{
    public class StudentEnrollment
    {
        // Öğrenci ile kurs arasındaki kayıt ilişkisini temsil eder.
        public int Id { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; } = null!;
        public int CourseId { get; set; }
        public Course Course { get; set; } = null!;
        public decimal CoursePrice { get; set; } // Kursun kayıt anındaki liste fiyatı.
        public decimal DiscountAmount { get; set; } // Öğrenciye uygulanan indirim tutarı.
        public decimal NetAmount { get; set; } // Öğrencinin ödeyeceği net ücret.
        public int InstallmentCount { get; set; } // Toplam taksit sayısı.
        public DateTime EnrollmentDate { get; set; } // Öğrencinin kursa kayıt tarihi.
        public bool IsActive { get; set; } // Enrollment aktif mi?
        public ICollection<PaymentInstallment> PaymentInstallments { get; set; } = new List<PaymentInstallment>(); // Bu kurs kaydına ait ödeme taksitleri.

    }
}