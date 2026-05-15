using MediatR;
using YeniCag.Crm.Application.Dto;
using YeniCag.Crm.Core.Consts;
using YeniCag.Crm.Core.Operations.Student;

namespace YeniCag.Crm.Application.UseCases.Student.CreateStudentWithEnrollment
{
    public class CreateStudentWithEnrollmentHandler : IRequestHandler<CreateStudentWithEnrollmentRequest, CreateStudentWithEnrollmentResponse>
    {
        private readonly IStudentOperation _studentOperation;

        public CreateStudentWithEnrollmentHandler(IStudentOperation studentOperation)
        {
            _studentOperation = studentOperation;
        }

        public async Task<CreateStudentWithEnrollmentResponse> Handle( CreateStudentWithEnrollmentRequest request, CancellationToken cancellationToken)
        {
            if (request.CourseId <= 0)
                throw new ApplicationException($"{ExCodes.CourseNotFound} - {ExMessages.CourseNotFound}");

            if (request.InstallmentCount <= 0)
                throw new ApplicationException($"{ExCodes.InvalidInstallmentCount} - {ExMessages.InvalidInstallmentCount}");

            if (request.DiscountAmount < 0)
                throw new ApplicationException($"{ExCodes.InvalidDiscountAmount} - {ExMessages.InvalidDiscountAmount}");

            if (!string.IsNullOrWhiteSpace(request.Email))
            {
                var emailExists = await _studentOperation.IsEmailExistsAsync( request.Email,  cancellationToken);

                if (emailExists)
                    throw new ApplicationException($"{ExCodes.StudentAlreadyExists} - {ExMessages.StudentAlreadyExists}");
            }

            var student = new Core.Entity.Student
            {
                Name = request.Name,
                Surname = request.Surname,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                DateOfBirth = request.DateOfBirth
            };

            var createdStudent = await _studentOperation.CreateStudentWithEnrollment(
                student,
                request.CourseId,
                request.DiscountAmount,
                request.InstallmentCount,
                request.FirstDueDate,
                cancellationToken);

            var enrollment = createdStudent.Enrollments.First();

            return new CreateStudentWithEnrollmentResponse
            {
                StudentId = createdStudent.Id,
                EnrollmentId = enrollment.Id,
                StudentFullName = $"{createdStudent.Name} {createdStudent.Surname}".Trim(),
                CourseName = enrollment.Course?.Name,
                CoursePrice = enrollment.CoursePrice,
                DiscountAmount = enrollment.DiscountAmount,
                NetAmount = enrollment.NetAmount,
                InstallmentCount = enrollment.InstallmentCount,
                Installments = enrollment.PaymentInstallments
                    .OrderBy(x => x.InstallmentNumber)
                    .Select(x => new PaymentInstallmentResponseDto
                    {
                        InstallmentNumber = x.InstallmentNumber,
                        Amount = x.Amount,
                        DueDate = x.DueDate,
                        IsPaid = x.IsPaid
                    })
                    .ToList()
            };
        }
    }
}