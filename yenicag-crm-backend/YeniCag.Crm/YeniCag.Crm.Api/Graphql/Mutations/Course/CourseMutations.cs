using MediatR;
using YeniCag.Crm.Application.UseCases.Course.CreateCourse;

namespace YeniCag.Crm.Api.Graphql.Mutations.Course
{
    [MutationType]
    public class CourseMutations
    {
        public async Task<CreateCourseResponse> CreateCourse( [Service] IMediator mediator, CreateCourseRequest request, CancellationToken cancellationToken)
        {
            return await mediator.Send(request, cancellationToken);
        }
    }
}
