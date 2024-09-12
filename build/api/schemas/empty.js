"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
// # scalar JSON
// # scalar JSONObject
exports.emptyTypeDefs = (0, apollo_server_express_1.gql) `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  # An object with a Globally Unique ID
  interface Node {
    # The ID of the object.
    id: ID!
  }
`;
