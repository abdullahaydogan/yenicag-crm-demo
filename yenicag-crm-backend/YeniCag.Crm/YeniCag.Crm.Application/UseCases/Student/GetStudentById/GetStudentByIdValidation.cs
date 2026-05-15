using FluentValidation;

namespace YeniCag.Crm.Application.UseCases.Student.GetStudentById
{
    public class GetStudentByIdValidation : AbstractValidator<GetStudentByIdRequest>
    {
        public GetStudentByIdValidation()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage("Id is required.");
        }
    }
}
