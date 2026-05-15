using MediatR;
using Microsoft.EntityFrameworkCore;
using YeniCag.Crm.Persistance.Context;

namespace YeniCag.Crm.Application.UseCases.Student.GetAllStudent
{
    public class GetAllStudentHandler : IRequestHandler<GetAllStudentRequest, IQueryable<Core.Entity.Student>>
    {
        private readonly AppDbContext _appDbContext;

        public GetAllStudentHandler(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<IQueryable<Core.Entity.Student>> Handle(GetAllStudentRequest request, CancellationToken cancellationToken)
        {
            var query = _appDbContext.Students.Include(e => e.Enrollments).ThenInclude(c =>c.Course).AsNoTracking();
            return await Task.FromResult(query);
        }
    }
}
