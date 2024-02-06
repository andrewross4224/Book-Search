import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
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