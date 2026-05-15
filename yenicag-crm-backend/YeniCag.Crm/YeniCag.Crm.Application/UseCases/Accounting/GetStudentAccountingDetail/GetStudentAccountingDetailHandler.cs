using MediatR;
using Microsoft.EntityFrameworkCore;
using YeniCag.Crm.Core.Consts;
using YeniCag.Crm.Core.Entity;
using YeniCag.Crm.Persistance.Context;

namespace YeniCag.Crm.Application.UseCases.Accounting.GetStudentAccountingDetail;

public class GetStudentAccountingDetailHandler : IRequestHandler<GetStudentAccountingDetailRequest, Core.Entity.Student>
{
    private readonly AppDbContext _appDbContext;

    public GetStudentAccountingDetailHandler(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<Core.Entity.Student> Handle( GetStudentAccountingDetailRequest request, CancellationToken cancellationToken)
    {
        var student = await _appDbContext.Students
            .Include(s => s.Enrollments)
                .ThenInclude(e => e.Course)
                    .ThenInclude(c => c.Teacher)
            .Include(s => s.Enrollments)
                .ThenInclude(e => e.PaymentInstallments)
            .FirstOrDefaultAsync(s => s.Id == request.StudentId, cancellationToken);

        if (student is null)
            throw new ApplicationException($"{ExCodes.StudentNotFound} - {ExMessages.StudentNotFound}");

        return student;
    }
}