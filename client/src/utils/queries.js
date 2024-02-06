import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query singleUser($userId: ID!) {
    profile(userId: $userId) {
      _id
      username
      email
      bookCount
      savedBooks    
    }
  }
`;