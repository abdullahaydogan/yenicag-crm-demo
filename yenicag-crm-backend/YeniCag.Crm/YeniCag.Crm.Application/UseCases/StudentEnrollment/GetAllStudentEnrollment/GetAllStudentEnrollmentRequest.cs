using MediatR;

namespace YeniCag.Crm.Application.UseCases.StudentEnrollment.GetAllStudentEnrollment
{
    public class GetAllStudentEnrollmentRequest : IRequest<IQueryable<Core.Entity.StudentEnrollment>>
    {
    }
}
