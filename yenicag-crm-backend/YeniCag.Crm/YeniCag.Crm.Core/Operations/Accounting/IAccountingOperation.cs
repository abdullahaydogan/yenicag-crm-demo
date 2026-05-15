using YeniCag.Crm.Core.Entity;

namespace YeniCag.Crm.Core.Operations.Accounting
{
    public interface IAccountingOperation
    {
        List<PaymentInstallment> GenerateInstallments(
            int studentEnrollmentId,
            decimal netAmount,
            int installmentCount,
            DateOnly firstDueDate); decimal CalculateNetAmount(decimal coursePrice, decimal discountAmount);
    }
}
