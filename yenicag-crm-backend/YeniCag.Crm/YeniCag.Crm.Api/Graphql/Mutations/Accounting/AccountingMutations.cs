using MediatR;
using YeniCag.Crm.Application.UseCases.Accounting.CreateStudentEnrollmentAccounting;
using YeniCag.Crm.Application.UseCases.Accounting.PayInstallment;
using YeniCag.Crm.Core.Entity;

namespace YeniCag.Crm.Api.Graphql.Mutations.Accounting;

using StudentEnrollmentEntity = YeniCag.Crm.Core.Entity.StudentEnrollment;

[ExtendObjectType("Mutation")]
public class AccountingMutations
{
    public async Task<StudentEnrollmentEntity> CreateStudentEnrollmentAccounting(
        [Service] IMediator mediator,
        CreateStudentEnrollmentAccountingRequest request,
        CancellationToken cancellationToken)
    {
        return await mediator.Send(request, cancellationToken);
    }

    public async Task<PaymentInstallment> PayInstallment(
        [Service] IMediator mediator,
        PayInstallmentRequest request,
        CancellationToken cancellationToken)
    {
        return await mediator.Send(request, cancellationToken);
    }
}