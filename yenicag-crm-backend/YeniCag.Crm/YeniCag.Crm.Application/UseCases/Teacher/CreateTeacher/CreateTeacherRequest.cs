using MediatR;

namespace YeniCag.Crm.Application.UseCases.Teacher.CreateTeacher
{
    public class CreateTeacherRequest : IRequest<CreateTeacherResponse>
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Branch { get; set; }
        public List<int>? CourseIds { get; set; }
    }
}
