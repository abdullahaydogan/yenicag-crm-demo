using MediatR;
using YeniCag.Crm.Application.UseCases.Student.CreateStudent;
using YeniCag.Crm.Application.UseCases.Student.CreateStudentWithEnrollment;

namespace YeniCag.Crm.Api.Graphql.Mutations.Student
{
    [MutationType]
    public class StudentMutations
    {
        public async Task<CreateStudentResponse> CreateStudent( [Service] IMediator mediator, CreateStudentRequest request, CancellationToken cancellationToken)
        {
            return await mediator.Send(request, cancellationToken);
        }

        public async Task<CreateStudentWithEnrollmentResponse> CreateStudentWithEnrollment( [Service] IMediator mediator, CreateStudentWithEnrollmentRequest request, CancellationToken cancellationToken)
        {
            return await mediator.Send(request, cancellationToken);
        }
    }
}