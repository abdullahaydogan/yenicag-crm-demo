using MediatR;
using Microsoft.EntityFrameworkCore;
using YeniCag.Crm.Application.Operations.Accounting;
using YeniCag.Crm.Core.Operations.Accounting;
using YeniCag.Crm.Persistance.Context;

namespace YeniCag.Crm.Application.UseCases.Accounting.CreateStudentEnrollmentAccounting;

using StudentEnrollmentEntity = YeniCag.Crm.Core.Entity.StudentEnrollment;

public class CreateStudentEnrollmentAccountingHandler
    : IRequestHandler<CreateStudentEnrollmentAccountingRequest, StudentEnrollmentEntity>
{
    private readonly AppDbContext _appDbContext;
    private readonly IAccountingOperation _accountingOperation;

    public CreateStudentEnrollmentAccountingHandler(
        AppDbContext appDbContext,
        IAccountingOperation accountingOperation)
    {
        _appDbContext = appDbContext;
        _accountingOperation = accountingOperation;
    }

    public async Task<StudentEnrollmentEntity> Handle(
        CreateStudentEnrollmentAccountingRequest request,
        CancellationToken cancellationToken)
    {
        var studentExists = await _appDbContext.Students
            .AnyAsync(s => s.Id == request.StudentId, cancellationToken);

        if (!studentExists)
            throw new ApplicationException("Öğrenci bulunamadı.");

        var course = await _appDbContext.Courses
            .FirstOrDefaultAsync(c => c.Id == request.CourseId, cancellationToken);

        if (course is null)
            throw new ApplicationException("Kurs bulunamadı.");

        var alreadyExists = await _appDbContext.StudentEnrollments
            .AnyAsync(x =>
                x.StudentId == request.StudentId &&
                x.CourseId == request.CourseId &&
                x.IsActive,
                cancellationToken);

        if (alreadyExists)
            throw new ApplicationException("Öğrenci bu kursa zaten kayıtlı.");

        var netAmount = _accountingOperation.CalculateNetAmount(
            request.CoursePrice,
            request.DiscountAmount);

        var enrollment = new StudentEnrollmentEntity
        {
            StudentId = request.StudentId,
            CourseId = request.CourseId,
            CoursePrice = request.CoursePrice,
            DiscountAmount = request.DiscountAmount,
            NetAmount = netAmount,
            InstallmentCount = request.InstallmentCount,
            EnrollmentDate = DateTime.UtcNow,
            IsActive = true
        };

        await _appDbContext.StudentEnrollments.AddAsync(enrollment, cancellationToken);
        await _appDbContext.SaveChangesAsync(cancellationToken);

        var installments = _accountingOperation.GenerateInstallments(
            enrollment.Id,
            netAmount,
            request.InstallmentCount,
            request.FirstDueDate);

        await _appDbContext.PaymentInstallments.AddRangeAsync(installments, cancellationToken);
        await _appDbContext.SaveChangesAsync(cancellationToken);

        return await _appDbContext.StudentEnrollments
            .Include(x => x.Course)
                .ThenInclude(c => c.Teacher)
            .Include(x => x.PaymentInstallments)
            .FirstAsync(x => x.Id == enrollment.Id, cancellationToken);
    }
}