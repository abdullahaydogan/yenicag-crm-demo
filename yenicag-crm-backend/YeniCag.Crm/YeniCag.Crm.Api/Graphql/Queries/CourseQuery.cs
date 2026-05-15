using MediatR;
using Microsoft.EntityFrameworkCore;
using YeniCag.Crm.Application.UseCases.Course.GetAllCourse;
using YeniCag.Crm.Core.Entity;
using YeniCag.Crm.Persistance.Context;

namespace YeniCag.Crm.Api.Graphql.Queries
{
    [QueryType]
    public class CourseQuery
    {
        public async Task<IQueryable<Course>> GetAllCourses([Service] IMediator mediator, CancellationToken cancellation)
        {
            return await mediator.Send(new GetAllCourseRequest(), cancellation);
        }


        public async Task<Course?> GetCourseById([Service] AppDbContext context, int id)
        {
            return await context.Courses
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
