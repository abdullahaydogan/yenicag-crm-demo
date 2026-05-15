using MediatR;

namespace YeniCag.Crm.Application.UseCases.Accounting.CreateStudentEnrollmentAccounting;

using StudentEnrollmentEntity = YeniCag.Crm.Core.Entity.StudentEnrollment;

public class CreateStudentEnrollmentAccountingRequest : IRequest<StudentEnrollmentEntity>
{
    public int StudentId { get; set; }
    public int CourseId { get; set; }
    public decimal CoursePrice { get; set; }
    public decimal DiscountAmount { get; set; }
    public int InstallmentCount { get; set; }
    public DateOnly FirstDueDate { get; set; }
}