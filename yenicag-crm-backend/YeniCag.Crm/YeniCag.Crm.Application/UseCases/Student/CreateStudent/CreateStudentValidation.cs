using FluentValidation;
using YeniCag.Crm.Core.Consts;

namespace YeniCag.Crm.Application.UseCases.Student.CreateStudent
{
    public class CreateStudentValidation : AbstractValidator<CreateStudentRequest>
    {
        public CreateStudentValidation()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage(ExMessages.StudentNameRequired);

            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage(ExMessages.StudentEmailRequired)
                .EmailAddress()
                .WithMessage("Invalid email address.");

            RuleFor(x => x.DateOfBirth)
                .LessThan(DateOnly.FromDateTime(DateTime.Today))
                .When(x => x.DateOfBirth.HasValue)
                .WithMessage("Student date of birth is invalid.");
        }
    }
}