using MediatR;

namespace YeniCag.Crm.Application.UseCases.Course.CreateCourse
{
    public class CreateCourseRequest : IRequest<CreateCourseResponse>
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
    }
}
