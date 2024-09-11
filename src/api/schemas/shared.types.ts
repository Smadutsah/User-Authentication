import { gql } from 'apollo-server-express';

export const sharedTypeDefs = gql`
  scalar BigInt
  scalar DateTime

  enum Country {
    US
    ZIMBABWE
  }

  type PageInfo {
    totalCount: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }
`;
