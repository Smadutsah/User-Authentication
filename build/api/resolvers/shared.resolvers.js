"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedResolvers = void 0;
const graphql_scalars_1 = require("graphql-scalars");
// following this: https://www.graphql-scalars.dev/docs/quick-start#in-your-sdl-type-definitions
exports.SharedResolvers = {
    BigInt: graphql_scalars_1.BigIntResolver,
    DateTime: graphql_scalars_1.DateTimeResolver
};
