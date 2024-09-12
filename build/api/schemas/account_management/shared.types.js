"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountManagementSharedTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.AccountManagementSharedTypeDefs = (0, apollo_server_express_1.gql) `
  enum AuthType {
    EMAIL
    PHONE
  }

  type AuthenticateResponse {
    accessToken: String!
    refreshToken: String!
  }
`;
