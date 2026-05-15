import { gql } from '@apollo/client';

export const CREATE_STUDENT = gql`
  mutation CreateStudent($request: CreateStudentRequestInput!) {
    createStudent(request: $request) {
      id
      name
      surname
      email
      phoneNumber
      dateOfBirth
      isActive
      createdDate
      courses {
        id
        name
        description
        price
        isActive
      }
    }
  }
`;