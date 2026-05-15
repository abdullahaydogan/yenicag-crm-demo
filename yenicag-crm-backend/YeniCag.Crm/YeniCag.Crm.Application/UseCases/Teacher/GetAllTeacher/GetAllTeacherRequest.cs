using MediatR;

namespace YeniCag.Crm.Application.UseCases.Teacher.GetAllTeacher
{
    public class GetAllTeacherRequest : IRequest<IQueryable<Core.Entity.Teacher>>
    {
    }
}
