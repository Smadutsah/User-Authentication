import 'graphql-import-node';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import { AuthenticationTypeDefs } from './schemas/account_management/authentication';
import { AccountManagementSharedTypeDefs } from './schemas/account_management/shared.types';
import { sharedTypeDefs } from './schemas/shared.types';
import { emptyTypeDefs } from './schemas/empty';
import resolvers from './resolvers';
import { AccountTypeDefs } from './schemas/account_management/account';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [AuthenticationTypeDefs, AccountTypeDefs, AccountManagementSharedTypeDefs, sharedTypeDefs, emptyTypeDefs],
  resolvers
});

export default schema;
