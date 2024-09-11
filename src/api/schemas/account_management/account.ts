import { gql } from 'apollo-server-express';

export const AccountTypeDefs = gql`
  extend type Mutation {
    createAccount(
      name: String!
      firstName: String!
      lastName: String!
      authenticationInformation: AuthenticationInformation!
      type: AccountType!
      location: String!
      device: String!
      idempotencyKey: String!
    ): AuthenticateResponse!
  }

  input AuthenticationInformation {
    value: String!
    type: AuthType!
    verificationCode: String!
    authenticationKey: String!
  }

  type Account implements Node {
    id: ID!
    name: String!
    type: AccountType!
  }

  type User implements Node {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: CustomerUserRole!
  }

  enum AccountType {
    BUSINESS
    PERSONAL
  }

  enum CustomerUserRole {
    ADMIN
    REGULAR
  }

  enum AssetAccountStatus {
    ACTIVE
    DELETED
  }
`;
