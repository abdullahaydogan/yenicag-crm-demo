namespace YeniCag.Crm.Core.Operations.Course
{
    public interface ICourseOperation
    {
        Task<bool> IsCourseNameExistsAsync( string courseName, CancellationToken cancellationToken = default);

        Task<YeniCag.Crm.Core.Entity.Course> CreateCourse( YeniCag.Crm.Core.Entity.Course course, CancellationToken cancellationToken = default);

        Task<List<YeniCag.Crm.Core.Entity.Course>> GetAllCourses( CancellationToken cancellationToken = default);
    }
}
