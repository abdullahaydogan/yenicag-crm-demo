namespace YeniCag.Crm.Application.UseCases.Student.CreateStudent
{
    public class CreateStudentResponse
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Surname { get; set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public DateOnly? DateOfBirth { get; set; }

        public bool IsActive { get; set; }

        public DateTime? CreatedDate { get; set; }
        public ICollection<YeniCag.Crm.Core.Entity.Course> Courses { get; set; } = new List<YeniCag.Crm.Core.Entity.Course>();

    }
}
