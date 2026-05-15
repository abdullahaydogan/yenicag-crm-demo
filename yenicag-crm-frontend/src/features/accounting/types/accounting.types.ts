export interface Teacher {
  id: number;
  name: string;
  surname: string;
  branch?: string | null;
}

export interface Course {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  teacher?: Teacher | null;
}

export interface PaymentInstallment {
  id: number;
  installmentNumber: number;
  amount: number;
  dueDate: string;
  isPaid: boolean;
  paidDate?: string | null;
}

export interface StudentEnrollment {
  id: number;
  coursePrice: number;
  discountAmount: number;
  netAmount: number;
  installmentCount: number;
  enrollmentDate: string;
  isActive: boolean;
  course: Course;
  paymentInstallments: PaymentInstallment[];
}

export interface StudentAccountingDetail {
  id: number;
  name: string;
  surname: string;
  email?: string | null;
  phoneNumber?: string | null;
  dateOfBirth?: string | null;
  isActive: boolean;
  createdDate?: string | null;
  enrollments: StudentEnrollment[];
}

export interface GetStudentAccountingDetailResponse {
  studentAccountingDetail: StudentAccountingDetail | null;
}

export interface GetStudentAccountingDetailVariables {
  studentId: number;
}

export interface GetAllCoursesForAccountingResponse {
  allCourses: Course[];
}