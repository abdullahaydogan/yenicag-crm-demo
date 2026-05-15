using FluentValidation;
using YeniCag.Crm.Core.Consts;

namespace YeniCag.Crm.Application.UseCases.Teacher.CreateTeacher
{
    public class CreateTeacherValidation : AbstractValidator<CreateTeacherRequest>
    {
        public CreateTeacherValidation()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage($"{ExCodes.TeacherNameRequired} - {ExMessages.TeacherNameRequired}");

            RuleFor(x => x.Surname)
                .NotEmpty()
                .WithMessage($"{ExCodes.TeacherSurnameRequired} - {ExMessages.TeacherSurnameRequired}");

            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage($"{ExCodes.TeacherEmailRequired} - {ExMessages.TeacherEmailRequired}");

            RuleFor(x => x.Branch)
                .NotEmpty()
                .WithMessage($"{ExCodes.TeacherBranchRequired} - {ExMessages.TeacherBranchRequired}");
        }
    }
}