import { TypedPubSub } from 'typed-graphql-subscriptions';
import { TokenInterface } from './api/auth';
import { PubSubChannels, pubSub } from './pubsub';
import { getUser } from './api/auth';

export type Context = {
  user: TokenInterface | null;
  pubSub: TypedPubSub<PubSubChannels> | null;
};

export async function createContext(_request: any): Promise<Context> {
  // ignore token for stuff that do  not need tokens
  if (
    [
      // for Auth
      'SendAuthVerficationCodeMutation',
      'VerifyAuthMutation',
      'LoginMutation',
      'CreateAccountMutation',
      'RefreshAcessTokenMutation'
    ].includes(_request?.body?.operationName)
  ) {
    return {
      user: null,
      pubSub: null
    };
  }

  // get the user token from the headers
  const authorization = _request?.headers.authorization || '';
  if (authorization !== '') {
    const token = authorization.replace('Bearer ', '');
    const user = getUser(token);
    return { user: { user }, pubSub };
  }

  return {
    user: null,
    pubSub: null
  };
}
