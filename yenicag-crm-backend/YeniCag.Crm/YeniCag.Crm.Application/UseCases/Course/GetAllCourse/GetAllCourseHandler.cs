using MediatR;
using Microsoft.EntityFrameworkCore;
using YeniCag.Crm.Persistance.Context;

namespace YeniCag.Crm.Application.UseCases.Course.GetAllCourse
{
    public class GetAllCourseHandler : IRequestHandler<GetAllCourseRequest, IQueryable<YeniCag.Crm.Core.Entity.Course>>
    {
        private readonly AppDbContext _appDbContext;

        public GetAllCourseHandler(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public Task<IQueryable<Core.Entity.Course>> Handle(GetAllCourseRequest request, CancellationToken cancellationToken)
        {
           var query = _appDbContext.Courses
                .Include(e => e.Enrollments)
                .ThenInclude(e => e.Student)
                .Include(t => t.Teacher)
                .AsNoTracking();
            return Task.FromResult(query);
        }
    }
}
