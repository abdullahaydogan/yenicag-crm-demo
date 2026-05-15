using MediatR;
using Microsoft.EntityFrameworkCore;
using YeniCag.Crm.Persistance.Context;

namespace YeniCag.Crm.Application.UseCases.Teacher.GetAllTeacher
{
    public class GetAllTeacherHandler : IRequestHandler<GetAllTeacherRequest, IQueryable<Core.Entity.Teacher>>
    {
        private readonly AppDbContext _appDbContext;

        public GetAllTeacherHandler(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<IQueryable<Core.Entity.Teacher>> Handle(GetAllTeacherRequest request, CancellationToken cancellationToken)
        {
            var query = _appDbContext.Teachers.Include(x => x.Courses).AsNoTracking().AsQueryable();
            return await Task.FromResult(query);
        }
    }
}
