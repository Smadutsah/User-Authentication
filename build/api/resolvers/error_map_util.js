"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processErrors = void 0;
const processErrors = (ok, error) => {
    if (ok && !error)
        return;
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
exports.processErrors = processErrors;
