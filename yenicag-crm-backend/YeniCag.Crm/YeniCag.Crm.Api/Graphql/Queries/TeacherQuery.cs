using MediatR;
using YeniCag.Crm.Application.UseCases.Teacher.GetAllTeacher;

namespace YeniCag.Crm.Api.Graphql.Queries
{
    [QueryType]
    public class TeacherQuery
    {
        public async Task<IQueryable<Core.Entity.Teacher>> GetAllTeachers([Service] IMediator mediator)
        {
            return await mediator.Send(new GetAllTeacherRequest());
        }
    }
}
