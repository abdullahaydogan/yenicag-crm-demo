using MediatR;
using YeniCag.Crm.Core.Consts;
using YeniCag.Crm.Core.Operations.Teacher;

namespace YeniCag.Crm.Application.UseCases.Teacher.CreateTeacher
{
    public class CreateTeacherHandler : IRequestHandler<CreateTeacherRequest, CreateTeacherResponse>
    {
        private readonly ITeacherOperation _teacherOperation;

        public CreateTeacherHandler(ITeacherOperation teacherOperation)
        {
            _teacherOperation = teacherOperation;
        }

        public async Task<CreateTeacherResponse> Handle( CreateTeacherRequest request, CancellationToken cancellationToken)
        {
            if (!string.IsNullOrWhiteSpace(request.Email))
            {
                var emailExists = await _teacherOperation.IsEmailExistsAsync( request.Email, cancellationToken);

                if (emailExists)
                {
                    throw new Exception($"{ExCodes.TeacherAlreadyExists} - {ExMessages.TeacherAlreadyExists}");
                }
            }

            var teacher = new Core.Entity.Teacher
            {
                Name = request.Name,
                Surname = request.Surname,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Branch = request.Branch
            };

            var createdTeacher = await _teacherOperation.CreateTeacher( teacher, request.CourseIds, cancellationToken);

            var result = new CreateTeacherResponse
            {
                Name = createdTeacher.Name,
                Surname = createdTeacher.Surname,
                Email = createdTeacher.Email,
                PhoneNumber = createdTeacher.PhoneNumber,
                Branch = createdTeacher.Branch,
                IsActive = createdTeacher.IsActive,
                CreatedDate = createdTeacher.CreatedDate,
                Courses = createdTeacher.Courses

            };
            return result;
        }
    }
}