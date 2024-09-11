import { gql } from 'apollo-server-express';

export const AccountManagementSharedTypeDefs = gql`
  enum AuthType {
    EMAIL
    PHONE
  }

  type AuthenticateResponse {
    accessToken: String!
    refreshToken: String!
  }
`;
