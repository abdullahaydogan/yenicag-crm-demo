using Mapster;
using MediatR;
using YeniCag.Crm.Core.Consts;
using YeniCag.Crm.Core.Operations.Student;

namespace YeniCag.Crm.Application.UseCases.Student.CreateStudent
{
    public class CreateStudentHandler
        : IRequestHandler<CreateStudentRequest, CreateStudentResponse>
    {
        private readonly IStudentOperation _studentOperation;

        public CreateStudentHandler(IStudentOperation studentOperation)
        {
            _studentOperation = studentOperation;
        }

        public async Task<CreateStudentResponse> Handle( CreateStudentRequest request,  CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.Name))
            {
                throw new ApplicationException($"{ExCodes.StudentNameRequired} - {ExMessages.StudentNameRequired}");
            }

            if (string.IsNullOrWhiteSpace(request.Email))
            {
                throw new ApplicationException($"{ExCodes.StudentEmailRequired} - {ExMessages.StudentEmailRequired}");
            }

            var emailExists = await _studentOperation.IsEmailExistsAsync( request.Email, cancellationToken);

            if (emailExists)
            {
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

            var createdStudent = await _studentOperation.CreateStudent( student, request.CourseIds, cancellationToken);

            var result = new CreateStudentResponse
            {
                Id = createdStudent.Id,
                Name = createdStudent.Name,
                Surname = createdStudent.Surname,
                Email = createdStudent.Email,
                PhoneNumber = createdStudent.PhoneNumber,
                DateOfBirth = createdStudent.DateOfBirth,
                IsActive = createdStudent.IsActive,
                CreatedDate = createdStudent.CreatedDate,
                //Courses = createdStudent.Courses
            };

            return result;
        }
    }
}