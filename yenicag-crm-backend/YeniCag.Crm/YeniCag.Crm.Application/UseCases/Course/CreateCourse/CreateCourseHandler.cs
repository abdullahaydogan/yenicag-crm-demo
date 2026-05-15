using MediatR;
using YeniCag.Crm.Core.Consts;
using YeniCag.Crm.Core.Operations.Course;

namespace YeniCag.Crm.Application.UseCases.Course.CreateCourse
{
    public class CreateCourseHandler : IRequestHandler<CreateCourseRequest, CreateCourseResponse>
    {
        private readonly ICourseOperation _courseOperation;

        public CreateCourseHandler(ICourseOperation courseOperation)
        {
            _courseOperation = courseOperation;
        }

        public async Task<CreateCourseResponse> Handle(CreateCourseRequest request, CancellationToken cancellationToken)
        {
            var existCourse = await _courseOperation.IsCourseNameExistsAsync(request.Name, cancellationToken);
            if (existCourse)
            {
                throw new ApplicationException($"{ExCodes.CourseAlreadyExists} - {ExMessages.CourseAlreadyExists}");
            }
            var course = new Core.Entity.Course
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
            };

            var createCourse = await _courseOperation.CreateCourse(course, cancellationToken);

            var result = new CreateCourseResponse
            {
                Id = createCourse.Id,
                Name = createCourse.Name,
                Description = createCourse.Description,
                Price = createCourse.Price,
                IsActive = createCourse.IsActive,
                CreatedDate = createCourse.CreatedDate
            };

            return result;
        }
    }
}
