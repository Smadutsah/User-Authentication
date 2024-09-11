import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { rule, IRules, shield, allow } from 'graphql-shield';
import { Mutation, Query, CustomerUserRole } from './generated';
import { AuthenticationError } from 'apollo-server-errors';

export interface TokenInterface extends jwt.JwtPayload {
  user: {
    firstName: string;
    lastName: string;
    id: string;
  };
}

type PermissionsSchema = IRules & {
  Query: Partial<Record<keyof Query | '*', IRules>>;
  Mutation: Partial<Record<keyof Mutation | '*', IRules>>;
};

const isAuthenticated = rule()((_parent: any, _args: any, { user }) => user.id != undefined && user.id != null);

// Another option is to hit the DB and ask if the customer is an admin or not
const isAdmin = rule()((_parent: any, _args: any, { user }) => user.role == CustomerUserRole.Admin);

const permissionsSchema: PermissionsSchema = {
  Query: {
    // account: isAuthenticated
    // user: isAuthenticated,
    // businessCustomerInformation: isAuthenticated,
    // businessLeaders: isAuthenticated,
    // consumerCustomerInformation: isAuthenticated
  },
  Mutation: {
    createAccount: allow,
    login: allow,
    refreshAccessToken: allow,
    sendAuthVerficationCode: allow,
    verifyAuth: allow

    // KYC
    // createBusinessInformation: isAuthenticated && isAdmin,
    // updateBusinessInformation: isAuthenticated && isAdmin,
    // createBusinessLeader: isAuthenticated && isAdmin,
    // updateBusinessLeader: isAuthenticated && isAdmin,
    // deleteBusinessLeader: isAuthenticated && isAdmin,
    // createConsumerCustomerInformation: isAuthenticated && isAdmin,
    // updateConsumerCustomerInformation: isAuthenticated && isAdmin
  }
};

export const permissionsSchemaShield = shield(permissionsSchema, {
  allowExternalErrors: true
});

export const createTokens = (id: string, authenticationKeyHash: string) => {
  const { AUTH_REFRESH_TOKEN_SECRET, AUTH_TOKEN_SECRET } = process.env;

  if (AUTH_TOKEN_SECRET && AUTH_REFRESH_TOKEN_SECRET) {
    const accessToken = jwt.sign(
      {
        user: { id, role: CustomerUserRole.Admin }
      },
      AUTH_TOKEN_SECRET,
      {
        algorithm: 'HS256',
        subject: id,
        expiresIn: '3h'
      }
    );

    const refreshToken = jwt.sign(
      {
        user: { id, role: CustomerUserRole.Admin }
      },
      AUTH_REFRESH_TOKEN_SECRET + authenticationKeyHash,
      {
        algorithm: 'HS256',
        subject: id,
        expiresIn: '7d'
      }
    );

    return [accessToken, refreshToken];
  } else {
    throw new AuthenticationError('Error creating tokens');
  }
};

export const decodeToken = (token: string): TokenInterface => {
  try {
    const decodedToken = jwt.decode(token);
    return decodedToken as TokenInterface;
  } catch (error) {
    throw new AuthenticationError('Invalid token');
  }
};

export const validateToken = (token: string, authenticationKeyHash?: string): TokenInterface => {
  const { AUTH_TOKEN_SECRET, AUTH_REFRESH_TOKEN_SECRET } = process.env;

  if (AUTH_TOKEN_SECRET && AUTH_REFRESH_TOKEN_SECRET) {
    try {
      const key = authenticationKeyHash ? AUTH_REFRESH_TOKEN_SECRET + authenticationKeyHash : AUTH_TOKEN_SECRET;

      const verifiedTokenInfo = jwt.verify(token, key);
      return verifiedTokenInfo as TokenInterface;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AuthenticationError('token expired');
      } else {
        throw new AuthenticationError('Error verifying token');
      }
    }
  } else {
    throw new AuthenticationError('Error validating token');
  }
};

export const getUser = (token: string) => {
  const tokenVerifiedInfo = validateToken(token);
  return (tokenVerifiedInfo as TokenInterface).user;
};
