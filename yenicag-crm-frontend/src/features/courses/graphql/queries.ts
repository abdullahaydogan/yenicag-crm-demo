import { gql } from '@apollo/client';

export const GET_ALL_COURSES = gql`
  query GetAllCourses {
    allCourses {
      id
      name
      description
      price
      isActive
      teacherId
      createdDate
      updatedDate
      teacher {
        id
        name
        surname
        branch
      }
      students {
        id
        name
        surname
        email
        phoneNumber
        isActive
      }
    }
  }
`;