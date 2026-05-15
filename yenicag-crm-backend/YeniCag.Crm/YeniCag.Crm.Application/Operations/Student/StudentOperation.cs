using Microsoft.EntityFrameworkCore;
using YeniCag.Crm.Core.Consts;
using YeniCag.Crm.Core.Operations.Student;
using YeniCag.Crm.Persistance.Context;

namespace YeniCag.Crm.Application.Operations.Student
{
    public class StudentOperation : IStudentOperation
    {
        private readonly AppDbContext _appDbContext;

        public StudentOperation(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Core.Entity.Student> CreateStudent(Core.Entity.Student student, List<int> courseIds, CancellationToken cancellation = default)
        {
            student.IsActive = true;
            student.CreatedDate = DateTime.UtcNow;

            await _appDbContext.Students.AddAsync(student, cancellation);
            await _appDbContext.SaveChangesAsync(cancellation);

            return student;
        }

        public Task<bool> IsEmailExistsAsync(string email, CancellationToken cancellationToken = default)
        {
           var exists = _appDbContext.Students.AnyAsync(x => x.Email == email, cancellationToken);
            return exists;
        }

        Task<List<Core.Entity.Student>> IStudentOperation.GetAllStudent(CancellationToken cancellation)
        {
            return null;
        }


        public async Task<Core.Entity.Student> CreateStudentWithEnrollment(Core.Entity.Student student, int courseId, decimal discountAmount, int installmentCount, DateOnly firstDueDate, CancellationToken cancellation = default)
        {
            student.IsActive = true;
            student.CreatedDate = DateTime.UtcNow;
            var course = _appDbContext.Courses.FirstOrDefault(x => x.Id == courseId && x.IsActive);

            if(course == null)
            {
                throw new ApplicationException($"{ExCodes.CourseNotFound}-{ExMessages.CourseNotFound}");
            }

            var netAmount = course.Price - discountAmount;
            var enrollment = new Core.Entity.StudentEnrollment
            {
                Student = student,
                CourseId = course.Id,
                CoursePrice = course.Price,
                DiscountAmount = discountAmount,
                NetAmount = netAmount,
                InstallmentCount = installmentCount,
                EnrollmentDate = DateTime.UtcNow,
                IsActive = true
            };

            enrollment.PaymentInstallments = CreateInstallments(enrollment,netAmount,installmentCount,firstDueDate);
            student.Enrollments.Add(enrollment);
            await _appDbContext.Students.AddAsync(student, cancellation);
            await _appDbContext.SaveChangesAsync(cancellation);

            return student;

        }
        private static List<Core.Entity.PaymentInstallment> CreateInstallments( Core.Entity.StudentEnrollment enrollment,decimal netAmount, int installmentCount, DateOnly firstDueDate)
        {
            var installments = new List<Core.Entity.PaymentInstallment>();

            var baseAmount = Math.Round(netAmount / installmentCount, 2);
            var totalBaseAmount = baseAmount * installmentCount;
            var difference = netAmount - totalBaseAmount;

            for (var i = 1; i <= installmentCount; i++)
            {
                var amount = baseAmount;

                if (i == installmentCount)
                {
                    amount += difference;
                }

                installments.Add(new Core.Entity.PaymentInstallment
                {
                    StudentEnrollment = enrollment,
                    InstallmentNumber = i,
                    Amount = amount,
                    DueDate = firstDueDate.AddMonths(i - 1),
                    IsPaid = false,
                    PaidDate = null
                });
            }

            return installments;
        }
    }
}
