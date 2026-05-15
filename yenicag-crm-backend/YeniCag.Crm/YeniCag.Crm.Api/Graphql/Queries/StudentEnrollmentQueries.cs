using MediatR;
using YeniCag.Crm.Application.UseCases.StudentEnrollment.GetAllStudentEnrollment;

namespace YeniCag.Crm.Api.Graphql.Queries
{
    [QueryType]
    public class StudentEnrollmentQueries
    {
        public async Task<IQueryable<Core.Entity.StudentEnrollment>> GetAllStudentEnrollment( [Service] IMediator mediator, CancellationToken cancellationToken)
        {
            return await mediator.Send( new GetAllStudentEnrollmentRequest(),  cancellationToken);
        }
    }
}
