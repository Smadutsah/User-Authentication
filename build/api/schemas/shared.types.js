"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.sharedTypeDefs = (0, apollo_server_express_1.gql) `
  scalar BigInt
  scalar DateTime

  enum Country {
    US
    ZIMBABWE
  }

  type PageInfo {
    totalCount: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }
`;
