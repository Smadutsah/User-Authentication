import { PubSub } from 'graphql-subscriptions';
import { TypedPubSub } from 'typed-graphql-subscriptions';
import * as Models from './api/generated';

export const NOTIFICATION = 'notification';

export type PubSubChannels = {
  notification: [{ notification: Models.Account }];
};

export const pubSub = new TypedPubSub<PubSubChannels>(new PubSub());
