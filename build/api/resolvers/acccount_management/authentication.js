"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationResolvers = void 0;
const Models = __importStar(require("../../generated"));
exports.AuthenticationResolvers = {
    Mutation: {
        login(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                // const { ok, accountAuthInfo, error } = await AuthenticationAPI.login(args);
                // processErrors(ok, error);
                // const [accessToken, refreshToken] = createTokens(
                //   accountAuthInfo!.customerUserId,
                //   accountAuthInfo!.authenticationKeyHash
                // );
                return { accessToken: '', refreshToken: '' };
            });
        },
        refreshAccessToken(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
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
            });
        },
        verifyAuth(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                // if (args.value.toLocaleLowerCase() == 'f@e.com') {
                //   return { value: args.value, type: args.type };
                // } else {
                //   const { ok, error } = await AuthenticationAPI.verifyAuth(args);
                //   processErrors(ok, error);
                //   return { value: args.value, type: args.type };
                // }
                return { value: '', type: Models.AuthType.Email };
            });
        },
        sendAuthVerficationCode(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                if (args.value.toLocaleLowerCase() == 'f@e.com') {
                    // return { value: args.value, type: args.type };
                }
                else {
                    // const { ok, error } = await AuthenticationAPI.sendAuthVerficationCode(args);
                    // processErrors(ok, error);
                    // return { value: args.value, type: args.type };
                }
                return { value: '', type: Models.AuthType.Email };
            });
        }
    }
};
