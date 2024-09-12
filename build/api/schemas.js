"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("graphql-import-node");
const graphql_tools_1 = require("graphql-tools");
const authentication_1 = require("./schemas/account_management/authentication");
const shared_types_1 = require("./schemas/account_management/shared.types");
const shared_types_2 = require("./schemas/shared.types");
const empty_1 = require("./schemas/empty");
const resolvers_1 = __importDefault(require("./resolvers"));
const account_1 = require("./schemas/account_management/account");
const schema = (0, graphql_tools_1.makeExecutableSchema)({
    typeDefs: [authentication_1.AuthenticationTypeDefs, account_1.AccountTypeDefs, shared_types_1.AccountManagementSharedTypeDefs, shared_types_2.sharedTypeDefs, empty_1.emptyTypeDefs],
    resolvers: resolvers_1.default
});
exports.default = schema;
