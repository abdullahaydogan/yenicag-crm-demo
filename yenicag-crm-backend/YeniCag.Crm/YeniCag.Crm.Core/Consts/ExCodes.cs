namespace YeniCag.Crm.Core.Consts
{
    public static class ExCodes
    {
        // ===== STUDENT =====
        public const string StudentNotFound = "STUDENT0000001";
        public const string StudentAlreadyExists = "STUDENT0000002";
        public const string InvalidStudentId = "STUDENT0000003";
        public const string StudentEmailRequired = "STUDENT0000004";
        public const string StudentNameRequired = "STUDENT0000005";
        public const string StudentSurnameRequired = "STUDENT0000006";
        public const string StudentDateOfBirthInvalid = "STUDENT0000007";
        // ===== COURSE =====
        public const string CourseNotFound = "COURSE0000001";
        public const string CourseAlreadyExists = "COURSE0000002";
        public const string InvalidCourseId = "COURSE0000003";
        public const string CourseNameRequired = "COURSE0000004";
        public const string CoursePriceInvalid = "COURSE0000005";
        public const string CourseInactive = "COURSE0000006";
        public const string CourseHasNoStudents = "COURSE0000007";
        // ===== TEACHER =====
        public const string TeacherNotFound = "TEACHER0000001";
        public const string TeacherAlreadyExists = "TEACHER0000002";
        public const string InvalidTeacherId = "TEACHER0000003";
        public const string TeacherNameRequired = "TEACHER0000004";
        public const string TeacherSurnameRequired = "TEACHER0000005";
        public const string TeacherEmailRequired = "TEACHER0000006";
        public const string TeacherBranchRequired = "TEACHER0000007";
        public const string TeacherInactive = "TEACHER0000008";
        public const string TeacherHasNoCourses = "TEACHER0000009";
        // ===== ENROLLMENT / PAYMENT =====
        public const string InvalidInstallmentCount = "ENROLLMENT0000001";
        public const string InvalidDiscountAmount = "ENROLLMENT0000002";

    }
}
