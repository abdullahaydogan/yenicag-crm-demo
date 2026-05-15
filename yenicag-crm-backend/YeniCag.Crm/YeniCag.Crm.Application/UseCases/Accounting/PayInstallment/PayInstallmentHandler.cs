using MediatR;
using Microsoft.EntityFrameworkCore;
using YeniCag.Crm.Core.Entity;
using YeniCag.Crm.Persistance.Context;

namespace YeniCag.Crm.Application.UseCases.Accounting.PayInstallment;

public class PayInstallmentHandler : IRequestHandler<PayInstallmentRequest, PaymentInstallment>
{
    private readonly AppDbContext _appDbContext;

    public PayInstallmentHandler(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<PaymentInstallment> Handle( PayInstallmentRequest request, CancellationToken cancellationToken)
    {
        var installment = await _appDbContext.PaymentInstallments.FirstOrDefaultAsync(x => x.Id == request.InstallmentId, cancellationToken);

        if (installment is null)
            throw new ApplicationException("Taksit bulunamadı.");

        if (installment.IsPaid)
            throw new ApplicationException("Bu taksit zaten ödenmiş.");

        installment.IsPaid = true;
        installment.PaidDate = request.PaidDate ?? DateTime.UtcNow;

        await _appDbContext.SaveChangesAsync(cancellationToken);

        return installment;
    }
}