import { ApolloError, UserInputError, AuthenticationError } from 'apollo-server-errors';

export const processErrors = (ok: boolean, error?: Error) => {
  if (ok && !error) return;

  // switch (error?.code) {
  //   case ReturnCode.OK:
  //     break;

  //   case ReturnCode.ALREADY_EXISTS:
  //   case ReturnCode.FAILED_PRECONDITION:
  //   case ReturnCode.INVALID_ARGUMENT:
  //   case ReturnCode.NOT_FOUND:
  //     throw new UserInputError(error?.message!);

  //   case ReturnCode.UNAUTHENTICATED:
  //   case ReturnCode.PERMISSION_DENIED:
  //     throw new AuthenticationError(error?.message!);

  //   default:
  //     throw new ApolloError(error?.message!);
  // }
};
