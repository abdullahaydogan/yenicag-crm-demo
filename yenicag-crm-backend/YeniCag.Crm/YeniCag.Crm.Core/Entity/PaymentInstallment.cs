namespace YeniCag.Crm.Core.Entity
{
    /// <summary>
    /// Öğrencinin ödeme taksitlerini temsil eder.
    /// </summary>
    public class PaymentInstallment
    {
        public int Id { get; set; }

        /// <summary>
        /// Taksitin bağlı olduğu enrollment kaydı.
        /// </summary>
        public int StudentEnrollmentId { get; set; }

        /// <summary>
        /// Enrollment navigation property.
        /// </summary>
        public StudentEnrollment StudentEnrollment { get; set; } = null!;

        /// <summary>
        /// Taksit sıra numarası.
        /// 
        /// Örn:
        /// 1 = ilk taksit
        /// 2 = ikinci taksit
        /// </summary>
        public int InstallmentNumber { get; set; }

        /// <summary>
        /// Bu taksitin ödenecek tutarı.
        /// </summary>
        public decimal Amount { get; set; }

        /// <summary>
        /// Taksitin son ödeme tarihi.
        /// </summary>
        public DateOnly DueDate { get; set; }

        /// <summary>
        /// Taksit ödendi mi?
        /// </summary>
        public bool IsPaid { get; set; }

        /// <summary>
        /// Taksitin ödendiği tarih.
        /// 
        /// Eğer ödeme yapılmadıysa null olur.
        /// </summary>
        public DateTime? PaidDate { get; set; }
    }
}