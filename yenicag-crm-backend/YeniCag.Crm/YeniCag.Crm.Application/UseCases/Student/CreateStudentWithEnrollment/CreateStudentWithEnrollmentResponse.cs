using YeniCag.Crm.Application.Dto;

namespace YeniCag.Crm.Application.UseCases.Student.CreateStudentWithEnrollment
{
    public class CreateStudentWithEnrollmentResponse
    {
        public int StudentId { get; set; }
        public int EnrollmentId { get; set; }

        public string? StudentFullName { get; set; }
        public string? CourseName { get; set; }

        public decimal CoursePrice { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal NetAmount { get; set; }

        public int InstallmentCount { get; set; }

        public List<PaymentInstallmentResponseDto> Installments { get; set; } = new();
    }


}