using Microsoft.EntityFrameworkCore;
using YeniCag.Crm.Core.Operations.Course;
using YeniCag.Crm.Persistance.Context;

namespace YeniCag.Crm.Application.Operations.Course
{
    public class CourseOperation : ICourseOperation
    {
        private readonly AppDbContext _appDbContext;

        public CourseOperation(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Core.Entity.Course> CreateCourse(Core.Entity.Course course, CancellationToken cancellationToken = default)
        {
            course.CreatedDate = DateTime.UtcNow;
            course.IsActive = true;
            await _appDbContext.Courses.AddAsync(course, cancellationToken);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return course;
        }

        public async Task<bool> IsCourseNameExistsAsync(string courseName, CancellationToken cancellationToken = default)
        {
            var exists = await _appDbContext.Courses.AnyAsync(x => x.Name == courseName, cancellationToken);
            return exists;
        }

        public async Task<List<Core.Entity.Course>> GetAllCourses(CancellationToken cancellationToken = default)
        {
            var courses = await _appDbContext.Courses.ToListAsync(cancellationToken);
            return courses;
        }

    }
}
