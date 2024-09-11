import { gql } from 'apollo-server-express';

// # scalar JSON
// # scalar JSONObject

export const emptyTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  # An object with a Globally Unique ID
  interface Node {
    # The ID of the object.
    id: ID!
  }
`;
