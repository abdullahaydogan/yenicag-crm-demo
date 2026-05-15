namespace YeniCag.Crm.Core.Operations.Student
{
    public interface IStudentOperation
    {
        Task<List<Entity.Student>> GetAllStudent( CancellationToken cancellation = default);
        Task<Entity.Student> CreateStudent(Entity.Student student,List<int> courseIds, CancellationToken cancellation = default);
        Task<bool> IsEmailExistsAsync( string email, CancellationToken cancellationToken = default);
        Task<Entity.Student> CreateStudentWithEnrollment( Entity.Student student,int courseId,decimal discountAmount, int installmentCount, DateOnly firstDueDate, CancellationToken cancellation = default);
    }
}