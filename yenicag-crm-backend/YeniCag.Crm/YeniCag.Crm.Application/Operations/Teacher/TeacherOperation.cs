using Microsoft.EntityFrameworkCore;
using YeniCag.Crm.Core.Consts;
using YeniCag.Crm.Core.Operations.Teacher;
using YeniCag.Crm.Persistance.Context;

namespace YeniCag.Crm.Application.Operations.Teacher
{
    public class TeacherOperation : ITeacherOperation
    {
        private readonly AppDbContext _appDbContext;

        public TeacherOperation(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Core.Entity.Teacher> CreateTeacher( Core.Entity.Teacher teacher,  List<int>? courseIds,  CancellationToken cancellationToken = default)
        {
            if (courseIds != null && courseIds.Any())
            {
                var courses = await _appDbContext.Courses.Where(x => courseIds.Contains(x.Id)).ToListAsync(cancellationToken);

                if (courses.Count != courseIds.Distinct().Count())
                {
                    throw new ApplicationException($"{ExCodes.CourseNotFound} - {ExMessages.CourseNotFound}");
                }

                teacher.Courses = courses;
            }

            teacher.IsActive = true;
            teacher.CreatedDate = DateTime.UtcNow;

            await _appDbContext.Teachers.AddAsync(teacher, cancellationToken);

            await _appDbContext.SaveChangesAsync(cancellationToken);

            return teacher;
        }

        public Task<bool> IsEmailExistsAsync(string email, CancellationToken cancellationToken = default)
        {
            var existTeacher = _appDbContext.Teachers.AnyAsync(x => x.Email == email, cancellationToken);
            return existTeacher;
        }

        public Task<List<Core.Entity.Teacher>> GetAllTeacher(CancellationToken cancellationToken = default)
        {
            return _appDbContext.Teachers.ToListAsync(cancellationToken);
        }
    }
}
