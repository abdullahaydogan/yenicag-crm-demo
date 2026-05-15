using MediatR;

namespace YeniCag.Crm.Application.UseCases.Course.GetAllCourse
{
    public class GetAllCourseRequest : IRequest<IQueryable<YeniCag.Crm.Core.Entity.Course>>
    {
    }
}
