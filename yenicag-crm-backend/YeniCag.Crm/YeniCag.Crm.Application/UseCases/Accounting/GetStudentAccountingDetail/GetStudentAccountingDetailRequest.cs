using MediatR;
using YeniCag.Crm.Core.Entity;

namespace YeniCag.Crm.Application.UseCases.Accounting.GetStudentAccountingDetail;

public class GetStudentAccountingDetailRequest : IRequest<Core.Entity.Student>
{
    public int StudentId { get; set; }
}