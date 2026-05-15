export type StudentCourse = {
  id: number;
  name: string | null;
  description: string | null;
  price: number;
  isActive: boolean;
};

export type StudentEnrollment = {
  id: number;
  coursePrice: number;
  discountAmount: number;
  netAmount: number;
  installmentCount: number;
  enrollmentDate: string | null;
  isActive: boolean;
  course: StudentCourse | null;
};

export type Student = {
  id: number;
  name: string | null;
  surname: string | null;
  email: string | null;
  phoneNumber: string | null;
  dateOfBirth: string | null;
  isActive: boolean;
  createdDate: string | null;
  updatedDate: string | null;
  enrollments: StudentEnrollment[];
};

export type GetAllStudentsResponse = {
  allStudents: Student[];
};

export type CreateStudentRequest = {
  name: string;
  surname?: string | null;
  email: string;
  phoneNumber?: string | null;
  dateOfBirth?: string | null;
};

export type CreateStudentResponse = {
  createStudent: Student;
};