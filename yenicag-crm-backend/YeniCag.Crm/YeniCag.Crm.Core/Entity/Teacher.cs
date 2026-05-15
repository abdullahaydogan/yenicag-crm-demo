namespace YeniCag.Crm.Core.Entity
{
    public class Teacher
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Surname { get; set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Branch { get; set; } // Matematik, Türkçe, Fen Bilimleri gibi

        public bool IsActive { get; set; } = true;

        public DateTime? CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }

        public ICollection<Course> Courses { get; set; } = new List<Course>();
    }
}
