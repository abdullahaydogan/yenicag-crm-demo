using MediatR;

namespace YeniCag.Crm.Application.UseCases.Student.GetStudentById
{
    public class GetStudentByIdRequest : IRequest<Core.Entity.Student>
    {
        public int Id { get; set; }
    }
}
