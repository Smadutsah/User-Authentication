"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubSub = exports.NOTIFICATION = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const typed_graphql_subscriptions_1 = require("typed-graphql-subscriptions");
exports.NOTIFICATION = 'notification';
exports.pubSub = new typed_graphql_subscriptions_1.TypedPubSub(new graphql_subscriptions_1.PubSub());
