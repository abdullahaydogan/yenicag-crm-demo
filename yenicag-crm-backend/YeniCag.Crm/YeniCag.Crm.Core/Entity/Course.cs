namespace YeniCag.Crm.Core.Entity
{
    public class Course
    {
        public int Id { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public bool IsActive { get; set; }
        public int? TeacherId { get; set; }
        public Teacher? Teacher { get; set; }

        /// <summary>
        /// Bu kursa kayıt olan öğrencilerin enrollment kayıtları.
        /// </summary>
        public ICollection<StudentEnrollment> Enrollments { get; set; } = new List<StudentEnrollment>();
    }
}