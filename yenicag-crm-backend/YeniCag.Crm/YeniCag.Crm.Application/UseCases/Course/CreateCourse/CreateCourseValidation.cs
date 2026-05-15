using FluentValidation;

namespace YeniCag.Crm.Application.UseCases.Course.CreateCourse
{
    public class CreateCourseValidation : AbstractValidator<CreateCourseRequest>
    {
        public CreateCourseValidation()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Course Name cannot be null");

            RuleFor(x => x.Price)
                .GreaterThan(0)
                .WithMessage("Course Price must be greater than 0");

            RuleFor(x => x.Description)
                .MaximumLength(500)
                .When(x => !string.IsNullOrWhiteSpace(x.Description))
                .WithMessage("Course description cannot exceed 500 characters.");
        }
    }
}
