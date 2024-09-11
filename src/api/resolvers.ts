import { merge } from 'lodash';
import { SharedResolvers } from './resolvers/shared.resolvers';
import { AuthenticationResolvers } from './resolvers/acccount_management/authentication';
import { AccountResolvers } from './resolvers/acccount_management/account';

const resolverMap = merge(SharedResolvers, AuthenticationResolvers, AccountResolvers);
export default resolverMap;
