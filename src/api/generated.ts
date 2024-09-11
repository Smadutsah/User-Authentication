import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  DateTime: any;
};

export type Account = Node & {
  __typename?: 'Account';
  id: Scalars['ID'];
  name: Scalars['String'];
  type: AccountType;
};

export enum AccountType {
  Business = 'BUSINESS',
  Personal = 'PERSONAL'
}

export enum AssetAccountStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED'
}

export enum AuthType {
  Email = 'EMAIL',
  Phone = 'PHONE'
}

export type AuthenticateResponse = {
  __typename?: 'AuthenticateResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type AuthenticationInformation = {
  authenticationKey: Scalars['String'];
  type: AuthType;
  value: Scalars['String'];
  verificationCode: Scalars['String'];
};

export enum Country {
  Us = 'US',
  Zimbabwe = 'ZIMBABWE'
}

export enum CustomerUserRole {
  Admin = 'ADMIN',
  Regular = 'REGULAR'
}

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  createAccount: AuthenticateResponse;
  login: AuthenticateResponse;
  refreshAccessToken: RefreshAccessTokenResponse;
  sendAuthVerficationCode: SendAuthVerficationCodeResponse;
  verifyAuth: VerifyAuthResponse;
};


export type MutationCreateAccountArgs = {
  authenticationInformation: AuthenticationInformation;
  device: Scalars['String'];
  firstName: Scalars['String'];
  idempotencyKey: Scalars['String'];
  lastName: Scalars['String'];
  location: Scalars['String'];
  name: Scalars['String'];
  type: AccountType;
};


export type MutationLoginArgs = {
  authenticationKey: Scalars['String'];
  device: Scalars['String'];
  idempotencyKey: Scalars['String'];
  location: Scalars['String'];
  type: AuthType;
  value: Scalars['String'];
};


export type MutationRefreshAccessTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationSendAuthVerficationCodeArgs = {
  device: Scalars['String'];
  idempotencyKey: Scalars['String'];
  location: Scalars['String'];
  type: AuthType;
  value: Scalars['String'];
};


export type MutationVerifyAuthArgs = {
  device: Scalars['String'];
  location: Scalars['String'];
  type: AuthType;
  value: Scalars['String'];
  verificationCode: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
};

export type RefreshAccessTokenResponse = {
  __typename?: 'RefreshAccessTokenResponse';
  accessToken: Scalars['String'];
  refreshToken?: Maybe<Scalars['String']>;
};

export type SendAuthVerficationCodeResponse = {
  __typename?: 'SendAuthVerficationCodeResponse';
  type: AuthType;
  value: Scalars['String'];
};

export type User = Node & {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  role: CustomerUserRole;
};

export type VerifyAuthResponse = {
  __typename?: 'VerifyAuthResponse';
  type: AuthType;
  value: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  AccountType: AccountType;
  AssetAccountStatus: AssetAccountStatus;
  AuthType: AuthType;
  AuthenticateResponse: ResolverTypeWrapper<AuthenticateResponse>;
  AuthenticationInformation: AuthenticationInformation;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Country: Country;
  CustomerUserRole: CustomerUserRole;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolversTypes['Account'] | ResolversTypes['User'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  RefreshAccessTokenResponse: ResolverTypeWrapper<RefreshAccessTokenResponse>;
  SendAuthVerficationCodeResponse: ResolverTypeWrapper<SendAuthVerficationCodeResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  VerifyAuthResponse: ResolverTypeWrapper<VerifyAuthResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  AuthenticateResponse: AuthenticateResponse;
  AuthenticationInformation: AuthenticationInformation;
  BigInt: Scalars['BigInt'];
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Node: ResolversParentTypes['Account'] | ResolversParentTypes['User'];
  PageInfo: PageInfo;
  Query: {};
  RefreshAccessTokenResponse: RefreshAccessTokenResponse;
  SendAuthVerficationCodeResponse: SendAuthVerficationCodeResponse;
  String: Scalars['String'];
  User: User;
  VerifyAuthResponse: VerifyAuthResponse;
};

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AccountType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthenticateResponse'] = ResolversParentTypes['AuthenticateResponse']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createAccount?: Resolver<ResolversTypes['AuthenticateResponse'], ParentType, ContextType, RequireFields<MutationCreateAccountArgs, 'authenticationInformation' | 'device' | 'firstName' | 'idempotencyKey' | 'lastName' | 'location' | 'name' | 'type'>>;
  login?: Resolver<ResolversTypes['AuthenticateResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'authenticationKey' | 'device' | 'idempotencyKey' | 'location' | 'type' | 'value'>>;
  refreshAccessToken?: Resolver<ResolversTypes['RefreshAccessTokenResponse'], ParentType, ContextType, RequireFields<MutationRefreshAccessTokenArgs, 'refreshToken'>>;
  sendAuthVerficationCode?: Resolver<ResolversTypes['SendAuthVerficationCodeResponse'], ParentType, ContextType, RequireFields<MutationSendAuthVerficationCodeArgs, 'device' | 'idempotencyKey' | 'location' | 'type' | 'value'>>;
  verifyAuth?: Resolver<ResolversTypes['VerifyAuthResponse'], ParentType, ContextType, RequireFields<MutationVerifyAuthArgs, 'device' | 'location' | 'type' | 'value' | 'verificationCode'>>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Account' | 'User', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type RefreshAccessTokenResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RefreshAccessTokenResponse'] = ResolversParentTypes['RefreshAccessTokenResponse']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SendAuthVerficationCodeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendAuthVerficationCodeResponse'] = ResolversParentTypes['SendAuthVerficationCodeResponse']> = {
  type?: Resolver<ResolversTypes['AuthType'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['CustomerUserRole'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyAuthResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyAuthResponse'] = ResolversParentTypes['VerifyAuthResponse']> = {
  type?: Resolver<ResolversTypes['AuthType'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  AuthenticateResponse?: AuthenticateResponseResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RefreshAccessTokenResponse?: RefreshAccessTokenResponseResolvers<ContextType>;
  SendAuthVerficationCodeResponse?: SendAuthVerficationCodeResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  VerifyAuthResponse?: VerifyAuthResponseResolvers<ContextType>;
};

