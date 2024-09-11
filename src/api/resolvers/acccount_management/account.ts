import * as Models from '../../generated';

export const AccountResolvers = {
  Mutation: {
    async createAccount(_: void, args: Models.MutationCreateAccountArgs): Promise<Models.AuthenticateResponse> {
      // const { ok, accountAuthInfo, error } = await AccountAPI.createAccount(args);

      // processErrors(ok, error);
      // const [accessToken, refreshToken] = await createTokens(
      //   accountAuthInfo!.customerUserId,
      //   accountAuthInfo!.authenticationKeyHash
      // );
      return { accessToken: '', refreshToken: '' };
    }
  }
};
