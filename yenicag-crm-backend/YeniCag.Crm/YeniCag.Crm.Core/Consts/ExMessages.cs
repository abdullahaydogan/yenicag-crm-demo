namespace YeniCag.Crm.Core.Consts
{
    public static class ExMessages
    {
        // ===== STUDENT =====
        public const string StudentNotFound = "Student not found.";
        public const string StudentAlreadyExists = "A student with the given email already exists.";
        public const string InvalidStudentId = "The provided student id is invalid.";
        public const string StudentEmailRequired = "Student email is required.";
        public const string StudentNameRequired = "Student name is required.";
        // ===== COURSE =====
        public const string CourseNotFound = "Course not found.";
        public const string CourseAlreadyExists = "A course with the given name already exists.";
        public const string InvalidCourseId = "The provided course id is invalid.";
        public const string CourseNameRequired = "Course name is required.";
        public const string CoursePriceInvalid = "Course price must be greater than zero.";
        public const string CourseInactive = "The course is not active.";
        public const string CourseHasNoStudents = "The course has no students assigned.";
        // ===== TEACHER =====
        public const string TeacherNotFound = "Teacher not found.";
        public const string TeacherAlreadyExists = "A teacher with the given email already exists.";
        public const string InvalidTeacherId = "The provided teacher id is invalid.";
        public const string TeacherNameRequired = "Teacher name is required.";
        public const string TeacherSurnameRequired = "Teacher surname is required.";
        public const string TeacherEmailRequired = "Teacher email is required.";
        public const string TeacherBranchRequired = "Teacher branch is required.";
        public const string TeacherInactive = "The teacher is not active.";
        public const string TeacherHasNoCourses = "The teacher has no assigned courses.";
        // ===== ENROLLMENT / PAYMENT =====
        public const string InvalidInstallmentCount = "Installment count must be greater than zero.";
        public const string InvalidDiscountAmount = "Discount amount is invalid.";

    }
}
