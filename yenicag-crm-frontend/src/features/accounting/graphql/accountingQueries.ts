import { gql } from '@apollo/client';

export const GET_STUDENT_ACCOUNTING_DETAIL = gql`
  query GetStudentAccountingDetail($studentId: Int!) {
    studentAccountingDetail(request: { studentId: $studentId }) {
      id
      name
      surname
      email
      phoneNumber
      dateOfBirth
      isActive
      createdDate

      enrollments {
        id
        coursePrice
        discountAmount
        netAmount
        installmentCount
        enrollmentDate
        isActive

        course {
          id
          name
          description
          price

          teacher {
            id
            name
            surname
            branch
          }
        }

        paymentInstallments {
          id
          installmentNumber
          amount
          dueDate
          isPaid
          paidDate
        }
      }
    }
  }
`;

export const GET_ALL_COURSES_FOR_ACCOUNTING = gql`
  query GetAllCoursesForAccounting {
    allCourses {
      id
      name
      price
      description
    }
  }
`;