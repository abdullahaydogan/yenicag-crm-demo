import { gql } from '@apollo/client';

export const CREATE_STUDENT_ENROLLMENT_ACCOUNTING = gql`
  mutation CreateStudentEnrollmentAccounting(
    $studentId: Int!
    $courseId: Int!
    $coursePrice: Decimal!
    $discountAmount: Decimal!
    $installmentCount: Int!
    $firstDueDate: LocalDate!
  ) {
    createStudentEnrollmentAccounting(
      request: {
        studentId: $studentId
        courseId: $courseId
        coursePrice: $coursePrice
        discountAmount: $discountAmount
        installmentCount: $installmentCount
        firstDueDate: $firstDueDate
      }
    ) {
      id
      coursePrice
      discountAmount
      netAmount
      installmentCount
      enrollmentDate
      isActive
    }
  }
`;

export const PAY_INSTALLMENT = gql`
  mutation PayInstallment($installmentId: Int!) {
    payInstallment(request: { installmentId: $installmentId }) {
      id
      installmentNumber
      amount
      dueDate
      isPaid
      paidDate
    }
  }
`;