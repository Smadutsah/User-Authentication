"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.validateToken = exports.decodeToken = exports.createTokens = exports.permissionsSchemaShield = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const graphql_shield_1 = require("graphql-shield");
const generated_1 = require("./generated");
const apollo_server_errors_1 = require("apollo-server-errors");
const isAuthenticated = (0, graphql_shield_1.rule)()((_parent, _args, { user }) => user.id != undefined && user.id != null);
// Another option is to hit the DB and ask if the customer is an admin or not
const isAdmin = (0, graphql_shield_1.rule)()((_parent, _args, { user }) => user.role == generated_1.CustomerUserRole.Admin);
const permissionsSchema = {
    Query: {
    // account: isAuthenticated
    // user: isAuthenticated,
    // businessCustomerInformation: isAuthenticated,
    // businessLeaders: isAuthenticated,
    // consumerCustomerInformation: isAuthenticated
    },
    Mutation: {
        createAccount: graphql_shield_1.allow,
        login: graphql_shield_1.allow,
        refreshAccessToken: graphql_shield_1.allow,
        sendAuthVerficationCode: graphql_shield_1.allow,
        verifyAuth: graphql_shield_1.allow
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
exports.permissionsSchemaShield = (0, graphql_shield_1.shield)(permissionsSchema, {
    allowExternalErrors: true
});
const createTokens = (id, authenticationKeyHash) => {
    const { AUTH_REFRESH_TOKEN_SECRET, AUTH_TOKEN_SECRET } = process.env;
    if (AUTH_TOKEN_SECRET && AUTH_REFRESH_TOKEN_SECRET) {
        const accessToken = jsonwebtoken_1.default.sign({
            user: { id, role: generated_1.CustomerUserRole.Admin }
        }, AUTH_TOKEN_SECRET, {
            algorithm: 'HS256',
            subject: id,
            expiresIn: '3h'
        });
        const refreshToken = jsonwebtoken_1.default.sign({
            user: { id, role: generated_1.CustomerUserRole.Admin }
        }, AUTH_REFRESH_TOKEN_SECRET + authenticationKeyHash, {
            algorithm: 'HS256',
            subject: id,
            expiresIn: '7d'
        });
        return [accessToken, refreshToken];
    }
    else {
        throw new apollo_server_errors_1.AuthenticationError('Error creating tokens');
    }
};
exports.createTokens = createTokens;
const decodeToken = (token) => {
    try {
        const decodedToken = jsonwebtoken_1.default.decode(token);
        return decodedToken;
    }
    catch (error) {
        throw new apollo_server_errors_1.AuthenticationError('Invalid token');
    }
};
exports.decodeToken = decodeToken;
const validateToken = (token, authenticationKeyHash) => {
    const { AUTH_TOKEN_SECRET, AUTH_REFRESH_TOKEN_SECRET } = process.env;
    if (AUTH_TOKEN_SECRET && AUTH_REFRESH_TOKEN_SECRET) {
        try {
            const key = authenticationKeyHash ? AUTH_REFRESH_TOKEN_SECRET + authenticationKeyHash : AUTH_TOKEN_SECRET;
            const verifiedTokenInfo = jsonwebtoken_1.default.verify(token, key);
            return verifiedTokenInfo;
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                throw new apollo_server_errors_1.AuthenticationError('token expired');
            }
            else {
                throw new apollo_server_errors_1.AuthenticationError('Error verifying token');
            }
        }
    }
    else {
        throw new apollo_server_errors_1.AuthenticationError('Error validating token');
    }
};
exports.validateToken = validateToken;
const getUser = (token) => {
    const tokenVerifiedInfo = (0, exports.validateToken)(token);
    return tokenVerifiedInfo.user;
};
exports.getUser = getUser;
