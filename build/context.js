"use strict";
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
exports.createContext = void 0;
const pubsub_1 = require("./pubsub");
const auth_1 = require("./api/auth");
function createContext(_request) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // ignore token for stuff that do  not need tokens
        if ([
            // for Auth
            'SendAuthVerficationCodeMutation',
            'VerifyAuthMutation',
            'LoginMutation',
            'CreateAccountMutation',
            'RefreshAcessTokenMutation'
        ].includes((_a = _request === null || _request === void 0 ? void 0 : _request.body) === null || _a === void 0 ? void 0 : _a.operationName)) {
            return {
                user: null,
                pubSub: null
            };
        }
        // get the user token from the headers
        const authorization = (_request === null || _request === void 0 ? void 0 : _request.headers.authorization) || '';
        if (authorization !== '') {
            const token = authorization.replace('Bearer ', '');
            const user = (0, auth_1.getUser)(token);
            return { user: { user }, pubSub: pubsub_1.pubSub };
        }
        return {
            user: null,
            pubSub: null
        };
    });
}
exports.createContext = createContext;
