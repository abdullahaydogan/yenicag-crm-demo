export type CourseStudent = {
  id: number;
  name: string | null;
  surname: string | null;
  email: string | null;
  phoneNumber: string | null;
  isActive: boolean;
};

export type CourseTeacher = {
  id: number;
  name: string | null;
  surname: string | null;
  branch: string | null;
};

export type Course = {
  id: number;
  name: string | null;
  description: string | null;
  price: number;
  isActive: boolean;
  teacherId: number | null;
  createdDate: string | null;
  updatedDate: string | null;
  teacher: CourseTeacher | null;
  students: CourseStudent[];
};

export type GetAllCoursesResponse = {
  allCourses: Course[];
};

export type CreateCourseRequest = {
  name: string;
  description?: string | null;
  price: number;
};

export type CreateCourseResponse = {
  createCourse: Course;
};