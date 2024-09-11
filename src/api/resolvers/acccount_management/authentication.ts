import { AuthenticationError, UserInputError } from 'apollo-server-express';
import * as Models from '../../generated';
import { createTokens, decodeToken, validateToken } from '../../auth';
import { processErrors } from '../error_map_util';

export const AuthenticationResolvers = {
  Mutation: {
    async login(_: void, args: Models.MutationLoginArgs): Promise<Models.AuthenticateResponse> {
      // const { ok, accountAuthInfo, error } = await AuthenticationAPI.login(args);
      // processErrors(ok, error);
      // const [accessToken, refreshToken] = createTokens(
      //   accountAuthInfo!.customerUserId,
      //   accountAuthInfo!.authenticationKeyHash
      // );
      return { accessToken: '', refreshToken: '' };
    },

    async refreshAccessToken(
      _: void,
      args: Models.MutationRefreshAccessTokenArgs
    ): Promise<Models.RefreshAccessTokenResponse> {
      // const decodedToken = decodeToken(args.refreshToken);
      // if (!decodedToken || !decodedToken?.exp) {
      //   throw new UserInputError('Invalid token');
      // }
      // const { ok, accountAuthInfo, error } = await AuthenticationAPI.getAuthenticationInformation(decodedToken.user.id);
      // processErrors(ok, error);
      // const validatedToken = validateToken(args.refreshToken, accountAuthInfo?.authenticationKeyHash);
      // // technically, this should not be possible but guerds against changes to implementation
      // // of validateToken
      // if (validatedToken.user.id != accountAuthInfo?.customerUserId) {
      //   throw new AuthenticationError('Error verifying token');
      // }
      // const [accessToken, refreshToken] = createTokens(
      //   accountAuthInfo?.customerUserId,
      //   accountAuthInfo?.authenticationKeyHash
      // );
      // // return a new refresh token if it is left with less than 1 day to expire.
      // // TODO(felix): ideally we want to create a new one when it is within 10% of expiring
      // // and also keep it in sync with the values in createTokens. We need to use https://github.com/vercel/ms)
      // if (decodedToken.exp - Date.now() / 1000 < 60 * 60 * 24) {
      //   return { accessToken, refreshToken };
      // }
      // return { accessToken };

      return { accessToken: '', refreshToken: '' };
    },

    async verifyAuth(_: void, args: Models.MutationVerifyAuthArgs): Promise<Models.VerifyAuthResponse> {
      // if (args.value.toLocaleLowerCase() == 'f@e.com') {
      //   return { value: args.value, type: args.type };
      // } else {
      //   const { ok, error } = await AuthenticationAPI.verifyAuth(args);
      //   processErrors(ok, error);
      //   return { value: args.value, type: args.type };
      // }

      return { value: '', type: Models.AuthType.Email };
    },

    async sendAuthVerficationCode(
      _: void,
      args: Models.MutationSendAuthVerficationCodeArgs
    ): Promise<Models.SendAuthVerficationCodeResponse> {
      if (args.value.toLocaleLowerCase() == 'f@e.com') {
        // return { value: args.value, type: args.type };
      } else {
        // const { ok, error } = await AuthenticationAPI.sendAuthVerficationCode(args);
        // processErrors(ok, error);
        // return { value: args.value, type: args.type };
      }

      return { value: '', type: Models.AuthType.Email };
    }
  }
};
