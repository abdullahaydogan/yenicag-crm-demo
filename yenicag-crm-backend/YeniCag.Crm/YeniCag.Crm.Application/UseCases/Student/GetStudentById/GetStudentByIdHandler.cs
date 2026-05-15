using MediatR;
using Microsoft.EntityFrameworkCore;
using YeniCag.Crm.Core.Consts;
using YeniCag.Crm.Persistance.Context;

namespace YeniCag.Crm.Application.UseCases.Student.GetStudentById
{
    public class GetStudentByIdHandler : IRequestHandler<GetStudentByIdRequest, Core.Entity.Student>
    {
        private readonly AppDbContext _appDbContext;

        public GetStudentByIdHandler(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Core.Entity.Student> Handle(GetStudentByIdRequest request, CancellationToken cancellationToken)
        {
            var student = await _appDbContext.Students
                                .Include(s => s.Enrollments)
                                    .ThenInclude(e => e.Course)
                                        .ThenInclude(c => c.Teacher)
                                .Include(s => s.Enrollments)
                                    .ThenInclude(e => e.PaymentInstallments)
                                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (student == null)
            {
                throw new ApplicationException( $"{ExCodes.StudentNotFound} - {ExMessages.StudentNotFound}");
            }

            return student;
        }
    }
}
