import { gql } from '@apollo/client';

export const CREATE_COURSE = gql`
  mutation CreateCourse($request: CreateCourseRequestInput!) {
    createCourse(request: $request) {
      id
      name
      description
      price
      isActive
      createdDate
      updatedDate
    }
  }
`;