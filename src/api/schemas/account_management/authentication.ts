import { gql } from 'apollo-server-express';

export const AuthenticationTypeDefs = gql`
  extend type Mutation {
    login(
      value: String!
      type: AuthType!
      authenticationKey: String!
      location: String!
      device: String!
      idempotencyKey: String!
    ): AuthenticateResponse!

    refreshAccessToken(refreshToken: String!): RefreshAccessTokenResponse!

    verifyAuth(
      value: String!
      type: AuthType!
      verificationCode: String!
      location: String!
      device: String!
    ): VerifyAuthResponse!

    sendAuthVerficationCode(
      type: AuthType!
      value: String!
      location: String!
      device: String!
      idempotencyKey: String!
    ): SendAuthVerficationCodeResponse!
  }

  type RefreshAccessTokenResponse {
    accessToken: String!
    refreshToken: String
  }

  type VerifyAuthResponse {
    type: AuthType!
    value: String!
  }

  type SendAuthVerficationCodeResponse {
    type: AuthType!
    value: String!
  }
`;
