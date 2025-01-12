import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BffServerInformation = {
  __typename?: 'BffServerInformation';
  author: Scalars['String']['output'];
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type CreateNoteMutationInput = {
  message: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: SelectableNoteType;
};

export type CreateNoteMutationResponse = {
  __typename?: 'CreateNoteMutationResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  note?: Maybe<NoteData>;
};

export type DeleteNoteMutationResponse = {
  __typename?: 'DeleteNoteMutationResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  note?: Maybe<NoteData>;
};

export type GetNoteListQueryInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SelectableNoteType>;
};

export type GetNoteListQueryResponse = {
  __typename?: 'GetNoteListQueryResponse';
  code: Scalars['Int']['output'];
  list?: Maybe<NoteDataListType>;
  message: Scalars['String']['output'];
};

export type GetNoteQueryResponse = {
  __typename?: 'GetNoteQueryResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  note?: Maybe<NoteData>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote?: Maybe<CreateNoteMutationResponse>;
  deleteNote?: Maybe<DeleteNoteMutationResponse>;
  updateNote?: Maybe<UpdateNoteMutationResponse>;
};


export type MutationCreateNoteArgs = {
  input: CreateNoteMutationInput;
};


export type MutationDeleteNoteArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateNoteArgs = {
  id: Scalars['String']['input'];
  input: UpdateNoteMutationInput;
};

export type NoteData = {
  __typename?: 'NoteData';
  _id: Scalars['String']['output'];
  created_at: Scalars['String']['output'];
  message: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: SelectableNoteType;
  updated_at: Scalars['String']['output'];
};

export type NoteDataListType = {
  __typename?: 'NoteDataListType';
  currentPage: Scalars['Int']['output'];
  notes: Array<Maybe<NoteData>>;
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  getBffServerInformation?: Maybe<BffServerInformation>;
  getNote: GetNoteQueryResponse;
  getNoteList: GetNoteListQueryResponse;
};


export type QueryGetNoteArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetNoteListArgs = {
  input?: InputMaybe<GetNoteListQueryInput>;
};

export enum SelectableNoteType {
  Raft = 'RAFT'
}

export type UpdateNoteMutationInput = {
  message?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SelectableNoteType>;
};

export type UpdateNoteMutationResponse = {
  __typename?: 'UpdateNoteMutationResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  note?: Maybe<NoteData>;
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
  BffServerInformation: ResolverTypeWrapper<BffServerInformation>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateNoteMutationInput: CreateNoteMutationInput;
  CreateNoteMutationResponse: ResolverTypeWrapper<CreateNoteMutationResponse>;
  DeleteNoteMutationResponse: ResolverTypeWrapper<DeleteNoteMutationResponse>;
  GetNoteListQueryInput: GetNoteListQueryInput;
  GetNoteListQueryResponse: ResolverTypeWrapper<GetNoteListQueryResponse>;
  GetNoteQueryResponse: ResolverTypeWrapper<GetNoteQueryResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  NoteData: ResolverTypeWrapper<NoteData>;
  NoteDataListType: ResolverTypeWrapper<NoteDataListType>;
  Query: ResolverTypeWrapper<{}>;
  SelectableNoteType: SelectableNoteType;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateNoteMutationInput: UpdateNoteMutationInput;
  UpdateNoteMutationResponse: ResolverTypeWrapper<UpdateNoteMutationResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BffServerInformation: BffServerInformation;
  Boolean: Scalars['Boolean']['output'];
  CreateNoteMutationInput: CreateNoteMutationInput;
  CreateNoteMutationResponse: CreateNoteMutationResponse;
  DeleteNoteMutationResponse: DeleteNoteMutationResponse;
  GetNoteListQueryInput: GetNoteListQueryInput;
  GetNoteListQueryResponse: GetNoteListQueryResponse;
  GetNoteQueryResponse: GetNoteQueryResponse;
  Int: Scalars['Int']['output'];
  Mutation: {};
  NoteData: NoteData;
  NoteDataListType: NoteDataListType;
  Query: {};
  String: Scalars['String']['output'];
  UpdateNoteMutationInput: UpdateNoteMutationInput;
  UpdateNoteMutationResponse: UpdateNoteMutationResponse;
};

export type BffServerInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['BffServerInformation'] = ResolversParentTypes['BffServerInformation']> = {
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateNoteMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateNoteMutationResponse'] = ResolversParentTypes['CreateNoteMutationResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['NoteData']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteNoteMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteNoteMutationResponse'] = ResolversParentTypes['DeleteNoteMutationResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['NoteData']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetNoteListQueryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetNoteListQueryResponse'] = ResolversParentTypes['GetNoteListQueryResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  list?: Resolver<Maybe<ResolversTypes['NoteDataListType']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetNoteQueryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetNoteQueryResponse'] = ResolversParentTypes['GetNoteQueryResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['NoteData']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createNote?: Resolver<Maybe<ResolversTypes['CreateNoteMutationResponse']>, ParentType, ContextType, RequireFields<MutationCreateNoteArgs, 'input'>>;
  deleteNote?: Resolver<Maybe<ResolversTypes['DeleteNoteMutationResponse']>, ParentType, ContextType, RequireFields<MutationDeleteNoteArgs, 'id'>>;
  updateNote?: Resolver<Maybe<ResolversTypes['UpdateNoteMutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateNoteArgs, 'id' | 'input'>>;
};

export type NoteDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['NoteData'] = ResolversParentTypes['NoteData']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SelectableNoteType'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NoteDataListTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['NoteDataListType'] = ResolversParentTypes['NoteDataListType']> = {
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  notes?: Resolver<Array<Maybe<ResolversTypes['NoteData']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getBffServerInformation?: Resolver<Maybe<ResolversTypes['BffServerInformation']>, ParentType, ContextType>;
  getNote?: Resolver<ResolversTypes['GetNoteQueryResponse'], ParentType, ContextType, RequireFields<QueryGetNoteArgs, 'id'>>;
  getNoteList?: Resolver<ResolversTypes['GetNoteListQueryResponse'], ParentType, ContextType, Partial<QueryGetNoteListArgs>>;
};

export type UpdateNoteMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateNoteMutationResponse'] = ResolversParentTypes['UpdateNoteMutationResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['NoteData']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BffServerInformation?: BffServerInformationResolvers<ContextType>;
  CreateNoteMutationResponse?: CreateNoteMutationResponseResolvers<ContextType>;
  DeleteNoteMutationResponse?: DeleteNoteMutationResponseResolvers<ContextType>;
  GetNoteListQueryResponse?: GetNoteListQueryResponseResolvers<ContextType>;
  GetNoteQueryResponse?: GetNoteQueryResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NoteData?: NoteDataResolvers<ContextType>;
  NoteDataListType?: NoteDataListTypeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UpdateNoteMutationResponse?: UpdateNoteMutationResponseResolvers<ContextType>;
};

