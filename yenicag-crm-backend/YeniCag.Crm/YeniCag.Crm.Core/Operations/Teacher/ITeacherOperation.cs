namespace YeniCag.Crm.Core.Operations.Teacher
{
    public interface ITeacherOperation
    {
        Task<Entity.Teacher> CreateTeacher(  Entity.Teacher teacher, List<int>? courseIds,  CancellationToken cancellationToken = default);
        Task<bool> IsEmailExistsAsync(  string email,  CancellationToken cancellationToken = default);
        Task<List<Entity.Teacher>> GetAllTeacher( CancellationToken cancellationToken = default);
    }
}
