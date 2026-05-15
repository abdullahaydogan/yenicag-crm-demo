using MediatR;

namespace YeniCag.Crm.Application.UseCases.Student.GetAllStudent
{
    public class GetAllStudentRequest : IRequest<IQueryable<Core.Entity.Student>>
    {
    }
}
