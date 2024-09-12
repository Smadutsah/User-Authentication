"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const shared_resolvers_1 = require("./resolvers/shared.resolvers");
const authentication_1 = require("./resolvers/acccount_management/authentication");
const account_1 = require("./resolvers/acccount_management/account");
const resolverMap = (0, lodash_1.merge)(shared_resolvers_1.SharedResolvers, authentication_1.AuthenticationResolvers, account_1.AccountResolvers);
exports.default = resolverMap;
