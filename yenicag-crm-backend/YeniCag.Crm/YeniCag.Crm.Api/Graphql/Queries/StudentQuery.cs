using MediatR;
using YeniCag.Crm.Application.UseCases.Student.GetAllStudent;
using YeniCag.Crm.Application.UseCases.Student.GetStudentById;
using YeniCag.Crm.Application.UseCases.Student.GetStudentWithEnrollment;
using YeniCag.Crm.Core.Entity;

namespace YeniCag.Crm.Api.Graphql.Queries
{
    [QueryType]
    public class StudentQuery
    {
        public async Task<IQueryable<Student>> GetAllStudents([Service] IMediator mediator, CancellationToken cancellationToken)
        {
            return await mediator.Send(new GetAllStudentRequest(), cancellationToken);
        }
        public async Task<IQueryable<Core.Entity.Student>> GetStudentWithEnrollment( [Service] IMediator mediator, CancellationToken cancellationToken)
        {
            return await mediator.Send( new GetStudentWithEnrollmentRequest(),  cancellationToken);
        }

        public async Task<Core.Entity.Student> GetStudentById( [Service] IMediator mediator,  GetStudentByIdRequest request)
        {
            return await mediator.Send(request);
        }
    }
}

