using MediatR;

namespace YeniCag.Crm.Application.UseCases.Student.CreateStudent
{
    public class CreateStudentRequest : IRequest<CreateStudentResponse>
    {
        public string? Name { get; set; }

        public string? Surname { get; set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public DateOnly? DateOfBirth { get; set; }

        public List<int>? CourseIds { get; set; } = new();
    }
}
