using YeniCag.Crm.Core.Entity;
using YeniCag.Crm.Core.Operations.Accounting;

namespace YeniCag.Crm.Application.Operations.Accounting;

public class AccountingOperation : IAccountingOperation
{
    public decimal CalculateNetAmount(decimal coursePrice, decimal discountAmount)
    {
        if (coursePrice <= 0)
            throw new ApplicationException("Kurs ücreti 0'dan büyük olmalıdır.");

        if (discountAmount < 0)
            throw new ApplicationException("İndirim tutarı negatif olamaz.");

        if (discountAmount > coursePrice)
            throw new ApplicationException("İndirim tutarı kurs ücretinden büyük olamaz.");

        return coursePrice - discountAmount;
    }

    public List<PaymentInstallment> GenerateInstallments( int studentEnrollmentId, decimal netAmount,int installmentCount, DateOnly firstDueDate)
    {
        if (installmentCount <= 0)
            throw new ApplicationException("Taksit sayısı 0'dan büyük olmalıdır.");

        if (netAmount <= 0)
            throw new ApplicationException("Net tutar 0'dan büyük olmalıdır.");

        var installments = new List<PaymentInstallment>();

        var baseAmount = Math.Round(netAmount / installmentCount, 2);
        var totalBaseAmount = baseAmount * installmentCount;
        var difference = netAmount - totalBaseAmount;

        for (var i = 1; i <= installmentCount; i++)
        {
            var amount = baseAmount;

            if (i == installmentCount)
                amount += difference;

            installments.Add(new PaymentInstallment
            {
                StudentEnrollmentId = studentEnrollmentId,
                InstallmentNumber = i,
                Amount = amount,
                DueDate = firstDueDate.AddMonths(i - 1),
                IsPaid = false,
                PaidDate = null
            });
        }

        return installments;
    }
}