import { BigIntResolver, DateTimeResolver } from 'graphql-scalars';

// following this: https://www.graphql-scalars.dev/docs/quick-start#in-your-sdl-type-definitions
export const SharedResolvers = {
  BigInt: BigIntResolver,
  DateTime: DateTimeResolver
};
