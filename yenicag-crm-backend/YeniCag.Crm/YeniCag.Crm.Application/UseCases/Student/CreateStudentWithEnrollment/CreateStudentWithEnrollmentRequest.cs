using MediatR;

namespace YeniCag.Crm.Application.UseCases.Student.CreateStudentWithEnrollment
{
    public class CreateStudentWithEnrollmentRequest : IRequest<CreateStudentWithEnrollmentResponse>
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public DateOnly? DateOfBirth { get; set; }

        public int CourseId { get; set; }

        public decimal DiscountAmount { get; set; }

        public int InstallmentCount { get; set; }

        public DateOnly FirstDueDate { get; set; }
    }
}