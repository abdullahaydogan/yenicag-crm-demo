using MediatR;
using Microsoft.EntityFrameworkCore;
using YeniCag.Crm.Persistance.Context;

namespace YeniCag.Crm.Application.UseCases.StudentEnrollment.GetAllStudentEnrollment
{
    public class GetAllStudentEnrollmentHandler : IRequestHandler<GetAllStudentEnrollmentRequest, IQueryable<Core.Entity.StudentEnrollment>>
    {
        private readonly AppDbContext _appDbContext;

        public GetAllStudentEnrollmentHandler(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public Task<IQueryable<Core.Entity.StudentEnrollment>> Handle(GetAllStudentEnrollmentRequest request, CancellationToken cancellationToken)
        {
            var query = _appDbContext.StudentEnrollments
                .Include(e => e.Student)
                .Include(e => e.Course)
                    .ThenInclude(c => c.Teacher)
                 .Include(p => p.PaymentInstallments)
                .AsNoTracking();
            return Task.FromResult(query);
        }
    }
}
