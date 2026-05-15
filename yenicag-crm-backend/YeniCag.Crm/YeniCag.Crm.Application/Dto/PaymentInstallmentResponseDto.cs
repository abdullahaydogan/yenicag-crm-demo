namespace YeniCag.Crm.Application.Dto
{
    public class PaymentInstallmentResponseDto
    {
        public int InstallmentNumber { get; set; }
        public decimal Amount { get; set; }
        public DateOnly DueDate { get; set; }
        public bool IsPaid { get; set; }
    }
}
