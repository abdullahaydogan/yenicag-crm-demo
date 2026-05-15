using MediatR;
using YeniCag.Crm.Core.Entity;

namespace YeniCag.Crm.Application.UseCases.Accounting.PayInstallment;

public class PayInstallmentRequest : IRequest<PaymentInstallment>
{
    public int InstallmentId { get; set; }
    public DateTime? PaidDate { get; set; }
}