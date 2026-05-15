using MediatR;

namespace YeniCag.Crm.Application.UseCases.Student.GetStudentWithEnrollment
{
    public class GetStudentWithEnrollmentRequest : IRequest<IQueryable<Core.Entity.Student>>
    {
    }
}
