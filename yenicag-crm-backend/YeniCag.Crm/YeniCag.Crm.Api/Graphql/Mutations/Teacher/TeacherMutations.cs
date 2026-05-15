using MediatR;
using YeniCag.Crm.Application.UseCases.Teacher.CreateTeacher;

namespace YeniCag.Crm.Api.Graphql.Mutations.Teacher
{
    [MutationType]
    public class TeacherMutations
    {
        public async Task<CreateTeacherResponse> CreateTeacher( [Service] IMediator mediator, CreateTeacherRequest request, CancellationToken cancellationToken)
        {
            return await mediator.Send(request, cancellationToken);
        }
    }
}