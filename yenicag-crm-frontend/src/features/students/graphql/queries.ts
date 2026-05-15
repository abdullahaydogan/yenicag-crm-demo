import { gql } from '@apollo/client';

export const GET_ALL_STUDENTS = gql`
  query GetAllStudents {
    allStudents {
      id
      name
      surname
      email
      phoneNumber
      dateOfBirth
      isActive
      createdDate
      updatedDate
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
          isActive
        }
      }
    }
  }
`;