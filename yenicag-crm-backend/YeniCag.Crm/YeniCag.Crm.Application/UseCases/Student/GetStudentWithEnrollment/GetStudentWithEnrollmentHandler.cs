using MediatR;
using Microsoft.EntityFrameworkCore;
using YeniCag.Crm.Persistance.Context;

namespace YeniCag.Crm.Application.UseCases.Student.GetStudentWithEnrollment
{
    public class GetStudentWithEnrollmentHandler : IRequestHandler<GetStudentWithEnrollmentRequest, IQueryable<Core.Entity.Student>>
    {
        private readonly AppDbContext _appDbContext;

        public GetStudentWithEnrollmentHandler(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public Task<IQueryable<Core.Entity.Student>> Handle( GetStudentWithEnrollmentRequest request, CancellationToken cancellationToken)
        {
            var query = _appDbContext.Students
                .Include(x => x.Enrollments)
                .ThenInclude(x => x.Course)
                .ThenInclude(x => x.Teacher)
                .Include(x => x.Enrollments)
                .ThenInclude(x => x.PaymentInstallments)
                .AsNoTracking();

            return Task.FromResult(query);
        }
    }
}