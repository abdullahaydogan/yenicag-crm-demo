using MediatR;
using YeniCag.Crm.Application.UseCases.Accounting.GetStudentAccountingDetail;
using YeniCag.Crm.Core.Entity;

namespace YeniCag.Crm.Api.Graphql.Queries.Accounting;

[ExtendObjectType("Query")]
public class AccountingQueries
{
    public async Task<Student> StudentAccountingDetail( [Service] IMediator mediator, GetStudentAccountingDetailRequest request, CancellationToken cancellationToken)
    {
        return await mediator.Send(request, cancellationToken);
    }
}