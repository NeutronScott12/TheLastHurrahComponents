import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AddModeratorInput = {
  application_id: Scalars['String'];
  moderator_id: Scalars['String'];
};

export type ApplicationModel = {
  __typename?: 'ApplicationModel';
  application_name: Scalars['String'];
  application_owner: UserModel;
  application_owner_id: Scalars['String'];
  auth_secret: Scalars['String'];
  authenticated_users: Array<UserModel>;
  authenticated_users_ids: Array<Scalars['String']>;
  comments: Array<CommentModel>;
  cost: Scalars['Float'];
  created_at: Scalars['DateTime'];
  id: Scalars['String'];
  moderators: Array<UserModel>;
  moderators_ids: Array<Scalars['String']>;
  plan: Scalars['String'];
  renewal?: Maybe<Scalars['DateTime']>;
  updated_at: Scalars['DateTime'];
};

export type CommentModel = {
  __typename?: 'CommentModel';
  application_id: Scalars['String'];
  author: UserModel;
  body: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['String'];
  ratings: Array<RatingModel>;
  replies: Array<CommentModel>;
  thread_id: Scalars['String'];
  updated_at: Scalars['DateTime'];
  user_id: Scalars['String'];
};

export type CreateApplicationInput = {
  application_name: Scalars['String'];
};

export type CreateCommentInput = {
  application_id: Scalars['String'];
  body: Scalars['String'];
  thread_id: Scalars['String'];
};

export type FetchCommentByThreadIdInput = {
  limit: Scalars['Float'];
  skip: Scalars['Float'];
  thread_id: Scalars['String'];
};

export type FetchCommentByThreadIdResponse = {
  __typename?: 'FetchCommentByThreadIdResponse';
  comments: Array<CommentModel>;
  comments_count: Scalars['Float'];
};

export type FindOrCreateOneThreadInput = {
  /** Application ID */
  application_id: Scalars['String'];
  /** Thread Title */
  title?: Maybe<Scalars['String']>;
  /** Thread website url */
  website_url: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  message: Scalars['String'];
  refresh_token: Scalars['String'];
  success: Scalars['Boolean'];
  token: Scalars['String'];
  user: UserModel;
};

export type Mutation = {
  __typename?: 'Mutation';
  add_application_moderator: ApplicationModel;
  confirm_user: StandardResponseModel;
  create_application: ApplicationModel;
  create_comment: CommentModel;
  delete_comment: StandardResponseModel;
  delete_user: StandardResponseModel;
  forgot_password: StandardResponseModel;
  login_user: LoginResponse;
  regenerate_new_auth_secret: ApplicationModel;
  register_user: StandardResponseModel;
  remove_application: ApplicationModel;
  remove_application_moderator: ApplicationModel;
  reset_password: StandardResponseModel;
  update_application: ApplicationModel;
  update_comment: CommentModel;
};


export type MutationAdd_Application_ModeratorArgs = {
  addModeratorInput: AddModeratorInput;
};


export type MutationConfirm_UserArgs = {
  token: Scalars['String'];
};


export type MutationCreate_ApplicationArgs = {
  createApplicationInput: CreateApplicationInput;
};


export type MutationCreate_CommentArgs = {
  CreateCommentInput: CreateCommentInput;
};


export type MutationDelete_CommentArgs = {
  commentId: Scalars['String'];
};


export type MutationDelete_UserArgs = {
  email: Scalars['String'];
};


export type MutationForgot_PasswordArgs = {
  email: Scalars['String'];
  redirect_url?: Maybe<Scalars['String']>;
};


export type MutationLogin_UserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegenerate_New_Auth_SecretArgs = {
  application_id: Scalars['String'];
};


export type MutationRegister_UserArgs = {
  application_id?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  redirect_url?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};


export type MutationRemove_ApplicationArgs = {
  id: Scalars['String'];
};


export type MutationRemove_Application_ModeratorArgs = {
  removeModeratorInput: RemoveModeratorInput;
};


export type MutationReset_PasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdate_ApplicationArgs = {
  updateApplicationInput: UpdateApplicationInput;
};


export type MutationUpdate_CommentArgs = {
  UpdateCommentInput: UpdateCommentInput;
};

export type Query = {
  __typename?: 'Query';
  current_user: UserModel;
  fetch_all_applications: Array<ApplicationModel>;
  fetch_all_threads: Array<ThreadModel>;
  fetch_applications_by_owner_id: Array<ApplicationModel>;
  fetch_comments: Array<CommentModel>;
  fetch_comments_by_thread_id: FetchCommentByThreadIdResponse;
  fetch_users: Array<UserModel>;
  find_one_application_by_id: ApplicationModel;
  find_one_application_by_name: ApplicationModel;
  find_one_thread_or_create_one: ThreadModel;
  resend_email_code: StandardResponseModel;
  search_user_by_email: UserModel;
};


export type QueryFetch_Comments_By_Thread_IdArgs = {
  fetchCommentByThreadIdInput: FetchCommentByThreadIdInput;
};


export type QueryFind_One_Application_By_IdArgs = {
  id: Scalars['String'];
};


export type QueryFind_One_Application_By_NameArgs = {
  name: Scalars['String'];
};


export type QueryFind_One_Thread_Or_Create_OneArgs = {
  findOrCreateOneThreadInput: FindOrCreateOneThreadInput;
};


export type QueryResend_Email_CodeArgs = {
  email: Scalars['String'];
  redirect_url: Scalars['String'];
};


export type QuerySearch_User_By_EmailArgs = {
  email: Scalars['String'];
};

export type RatingModel = {
  __typename?: 'RatingModel';
  authorId: Scalars['String'];
  comment: CommentModel;
  id: Scalars['String'];
};

export type RemoveModeratorInput = {
  application_id: Scalars['String'];
  moderator_id: Scalars['String'];
};

export type StandardResponseModel = {
  __typename?: 'StandardResponseModel';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type ThreadModel = {
  __typename?: 'ThreadModel';
  application_id: Scalars['String'];
  /** UUID for Thread */
  id: Scalars['String'];
  thread_comments: Array<CommentModel>;
  title: Scalars['String'];
  website_url: Scalars['String'];
};

export type UpdateApplicationInput = {
  application_name: Scalars['String'];
  id: Scalars['String'];
};

export type UpdateCommentInput = {
  body: Scalars['String'];
  comment_id: Scalars['String'];
};

export type UserModel = {
  __typename?: 'UserModel';
  applications_joined_ids: Array<Scalars['String']>;
  confirmed: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  updated_at: Scalars['DateTime'];
  user_role: Scalars['String'];
  username: Scalars['String'];
};

export type FindOneOrCreateOneThreadQueryVariables = Exact<{
  findOrCreateOneThreadInput: FindOrCreateOneThreadInput;
}>;


export type FindOneOrCreateOneThreadQuery = { __typename?: 'Query', find_one_thread_or_create_one: { __typename?: 'ThreadModel', id: string, application_id: string, title: string, website_url: string } };

export type CommentFragmentFragment = { __typename?: 'CommentModel', application_id: string, body: string, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, author: { __typename?: 'UserModel', username: string, email: string, id: string }, ratings: Array<{ __typename?: 'RatingModel', id: string }> };

export type FetchCommentByThreadIdQueryVariables = Exact<{
  fetchCommentByThreadIdInput: FetchCommentByThreadIdInput;
}>;


export type FetchCommentByThreadIdQuery = { __typename?: 'Query', fetch_comments_by_thread_id: { __typename?: 'FetchCommentByThreadIdResponse', comments_count: number, comments: Array<{ __typename?: 'CommentModel', application_id: string, body: string, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, replies: Array<{ __typename?: 'CommentModel', application_id: string, body: string, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, author: { __typename?: 'UserModel', username: string, email: string, id: string }, ratings: Array<{ __typename?: 'RatingModel', id: string }> }>, author: { __typename?: 'UserModel', username: string, email: string, id: string }, ratings: Array<{ __typename?: 'RatingModel', id: string }> }> } };

export type CreateThreadComentMutationVariables = Exact<{
  createCommentInput: CreateCommentInput;
}>;


export type CreateThreadComentMutation = { __typename?: 'Mutation', create_comment: { __typename?: 'CommentModel', application_id: string, body: string, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, replies: Array<{ __typename?: 'CommentModel', application_id: string, body: string, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, author: { __typename?: 'UserModel', username: string, email: string, id: string }, ratings: Array<{ __typename?: 'RatingModel', id: string }> }>, author: { __typename?: 'UserModel', username: string, email: string, id: string }, ratings: Array<{ __typename?: 'RatingModel', id: string }> } };

export type DeleteThreadCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type DeleteThreadCommentMutation = { __typename?: 'Mutation', delete_comment: { __typename?: 'StandardResponseModel', success: boolean, message: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', current_user: { __typename?: 'UserModel', id: string, email: string } };

export const CommentFragmentFragmentDoc = gql`
    fragment CommentFragment on CommentModel {
  application_id
  author {
    username
    email
    id
  }
  body
  id
  thread_id
  created_at
  updated_at
  user_id
  ratings {
    id
  }
}
    `;
export const FindOneOrCreateOneThreadDocument = gql`
    query FindOneOrCreateOneThread($findOrCreateOneThreadInput: FindOrCreateOneThreadInput!) {
  find_one_thread_or_create_one(
    findOrCreateOneThreadInput: $findOrCreateOneThreadInput
  ) {
    id
    application_id
    title
    website_url
  }
}
    `;

/**
 * __useFindOneOrCreateOneThreadQuery__
 *
 * To run a query within a React component, call `useFindOneOrCreateOneThreadQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneOrCreateOneThreadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneOrCreateOneThreadQuery({
 *   variables: {
 *      findOrCreateOneThreadInput: // value for 'findOrCreateOneThreadInput'
 *   },
 * });
 */
export function useFindOneOrCreateOneThreadQuery(baseOptions: Apollo.QueryHookOptions<FindOneOrCreateOneThreadQuery, FindOneOrCreateOneThreadQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneOrCreateOneThreadQuery, FindOneOrCreateOneThreadQueryVariables>(FindOneOrCreateOneThreadDocument, options);
      }
export function useFindOneOrCreateOneThreadLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneOrCreateOneThreadQuery, FindOneOrCreateOneThreadQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneOrCreateOneThreadQuery, FindOneOrCreateOneThreadQueryVariables>(FindOneOrCreateOneThreadDocument, options);
        }
export type FindOneOrCreateOneThreadQueryHookResult = ReturnType<typeof useFindOneOrCreateOneThreadQuery>;
export type FindOneOrCreateOneThreadLazyQueryHookResult = ReturnType<typeof useFindOneOrCreateOneThreadLazyQuery>;
export type FindOneOrCreateOneThreadQueryResult = Apollo.QueryResult<FindOneOrCreateOneThreadQuery, FindOneOrCreateOneThreadQueryVariables>;
export const FetchCommentByThreadIdDocument = gql`
    query FetchCommentByThreadId($fetchCommentByThreadIdInput: FetchCommentByThreadIdInput!) {
  fetch_comments_by_thread_id(
    fetchCommentByThreadIdInput: $fetchCommentByThreadIdInput
  ) {
    comments_count
    comments {
      ...CommentFragment
      replies {
        ...CommentFragment
      }
    }
  }
}
    ${CommentFragmentFragmentDoc}`;

/**
 * __useFetchCommentByThreadIdQuery__
 *
 * To run a query within a React component, call `useFetchCommentByThreadIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchCommentByThreadIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchCommentByThreadIdQuery({
 *   variables: {
 *      fetchCommentByThreadIdInput: // value for 'fetchCommentByThreadIdInput'
 *   },
 * });
 */
export function useFetchCommentByThreadIdQuery(baseOptions: Apollo.QueryHookOptions<FetchCommentByThreadIdQuery, FetchCommentByThreadIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchCommentByThreadIdQuery, FetchCommentByThreadIdQueryVariables>(FetchCommentByThreadIdDocument, options);
      }
export function useFetchCommentByThreadIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchCommentByThreadIdQuery, FetchCommentByThreadIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchCommentByThreadIdQuery, FetchCommentByThreadIdQueryVariables>(FetchCommentByThreadIdDocument, options);
        }
export type FetchCommentByThreadIdQueryHookResult = ReturnType<typeof useFetchCommentByThreadIdQuery>;
export type FetchCommentByThreadIdLazyQueryHookResult = ReturnType<typeof useFetchCommentByThreadIdLazyQuery>;
export type FetchCommentByThreadIdQueryResult = Apollo.QueryResult<FetchCommentByThreadIdQuery, FetchCommentByThreadIdQueryVariables>;
export const CreateThreadComentDocument = gql`
    mutation CreateThreadComent($createCommentInput: CreateCommentInput!) {
  create_comment(CreateCommentInput: $createCommentInput) {
    ...CommentFragment
    replies {
      ...CommentFragment
    }
  }
}
    ${CommentFragmentFragmentDoc}`;
export type CreateThreadComentMutationFn = Apollo.MutationFunction<CreateThreadComentMutation, CreateThreadComentMutationVariables>;

/**
 * __useCreateThreadComentMutation__
 *
 * To run a mutation, you first call `useCreateThreadComentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThreadComentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThreadComentMutation, { data, loading, error }] = useCreateThreadComentMutation({
 *   variables: {
 *      createCommentInput: // value for 'createCommentInput'
 *   },
 * });
 */
export function useCreateThreadComentMutation(baseOptions?: Apollo.MutationHookOptions<CreateThreadComentMutation, CreateThreadComentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateThreadComentMutation, CreateThreadComentMutationVariables>(CreateThreadComentDocument, options);
      }
export type CreateThreadComentMutationHookResult = ReturnType<typeof useCreateThreadComentMutation>;
export type CreateThreadComentMutationResult = Apollo.MutationResult<CreateThreadComentMutation>;
export type CreateThreadComentMutationOptions = Apollo.BaseMutationOptions<CreateThreadComentMutation, CreateThreadComentMutationVariables>;
export const DeleteThreadCommentDocument = gql`
    mutation DeleteThreadComment($commentId: String!) {
  delete_comment(commentId: $commentId) {
    success
    message
  }
}
    `;
export type DeleteThreadCommentMutationFn = Apollo.MutationFunction<DeleteThreadCommentMutation, DeleteThreadCommentMutationVariables>;

/**
 * __useDeleteThreadCommentMutation__
 *
 * To run a mutation, you first call `useDeleteThreadCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteThreadCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteThreadCommentMutation, { data, loading, error }] = useDeleteThreadCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteThreadCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteThreadCommentMutation, DeleteThreadCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteThreadCommentMutation, DeleteThreadCommentMutationVariables>(DeleteThreadCommentDocument, options);
      }
export type DeleteThreadCommentMutationHookResult = ReturnType<typeof useDeleteThreadCommentMutation>;
export type DeleteThreadCommentMutationResult = Apollo.MutationResult<DeleteThreadCommentMutation>;
export type DeleteThreadCommentMutationOptions = Apollo.BaseMutationOptions<DeleteThreadCommentMutation, DeleteThreadCommentMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  current_user {
    id
    email
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export type ApplicationModelKeySpecifier = ('application_name' | 'application_owner' | 'application_owner_id' | 'auth_secret' | 'authenticated_users' | 'authenticated_users_ids' | 'comments' | 'cost' | 'created_at' | 'id' | 'moderators' | 'moderators_ids' | 'plan' | 'renewal' | 'updated_at' | ApplicationModelKeySpecifier)[];
export type ApplicationModelFieldPolicy = {
	application_name?: FieldPolicy<any> | FieldReadFunction<any>,
	application_owner?: FieldPolicy<any> | FieldReadFunction<any>,
	application_owner_id?: FieldPolicy<any> | FieldReadFunction<any>,
	auth_secret?: FieldPolicy<any> | FieldReadFunction<any>,
	authenticated_users?: FieldPolicy<any> | FieldReadFunction<any>,
	authenticated_users_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	cost?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	moderators?: FieldPolicy<any> | FieldReadFunction<any>,
	moderators_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	plan?: FieldPolicy<any> | FieldReadFunction<any>,
	renewal?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommentModelKeySpecifier = ('application_id' | 'author' | 'body' | 'created_at' | 'id' | 'ratings' | 'replies' | 'thread_id' | 'updated_at' | 'user_id' | CommentModelKeySpecifier)[];
export type CommentModelFieldPolicy = {
	application_id?: FieldPolicy<any> | FieldReadFunction<any>,
	author?: FieldPolicy<any> | FieldReadFunction<any>,
	body?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	ratings?: FieldPolicy<any> | FieldReadFunction<any>,
	replies?: FieldPolicy<any> | FieldReadFunction<any>,
	thread_id?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FetchCommentByThreadIdResponseKeySpecifier = ('comments' | 'comments_count' | FetchCommentByThreadIdResponseKeySpecifier)[];
export type FetchCommentByThreadIdResponseFieldPolicy = {
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	comments_count?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoginResponseKeySpecifier = ('message' | 'refresh_token' | 'success' | 'token' | 'user' | LoginResponseKeySpecifier)[];
export type LoginResponseFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	refresh_token?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('add_application_moderator' | 'confirm_user' | 'create_application' | 'create_comment' | 'delete_comment' | 'delete_user' | 'forgot_password' | 'login_user' | 'regenerate_new_auth_secret' | 'register_user' | 'remove_application' | 'remove_application_moderator' | 'reset_password' | 'update_application' | 'update_comment' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	add_application_moderator?: FieldPolicy<any> | FieldReadFunction<any>,
	confirm_user?: FieldPolicy<any> | FieldReadFunction<any>,
	create_application?: FieldPolicy<any> | FieldReadFunction<any>,
	create_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_user?: FieldPolicy<any> | FieldReadFunction<any>,
	forgot_password?: FieldPolicy<any> | FieldReadFunction<any>,
	login_user?: FieldPolicy<any> | FieldReadFunction<any>,
	regenerate_new_auth_secret?: FieldPolicy<any> | FieldReadFunction<any>,
	register_user?: FieldPolicy<any> | FieldReadFunction<any>,
	remove_application?: FieldPolicy<any> | FieldReadFunction<any>,
	remove_application_moderator?: FieldPolicy<any> | FieldReadFunction<any>,
	reset_password?: FieldPolicy<any> | FieldReadFunction<any>,
	update_application?: FieldPolicy<any> | FieldReadFunction<any>,
	update_comment?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('current_user' | 'fetch_all_applications' | 'fetch_all_threads' | 'fetch_applications_by_owner_id' | 'fetch_comments' | 'fetch_comments_by_thread_id' | 'fetch_users' | 'find_one_application_by_id' | 'find_one_application_by_name' | 'find_one_thread_or_create_one' | 'resend_email_code' | 'search_user_by_email' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	current_user?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_all_applications?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_all_threads?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_applications_by_owner_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_comments_by_thread_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_users?: FieldPolicy<any> | FieldReadFunction<any>,
	find_one_application_by_id?: FieldPolicy<any> | FieldReadFunction<any>,
	find_one_application_by_name?: FieldPolicy<any> | FieldReadFunction<any>,
	find_one_thread_or_create_one?: FieldPolicy<any> | FieldReadFunction<any>,
	resend_email_code?: FieldPolicy<any> | FieldReadFunction<any>,
	search_user_by_email?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RatingModelKeySpecifier = ('authorId' | 'comment' | 'id' | RatingModelKeySpecifier)[];
export type RatingModelFieldPolicy = {
	authorId?: FieldPolicy<any> | FieldReadFunction<any>,
	comment?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StandardResponseModelKeySpecifier = ('message' | 'success' | StandardResponseModelKeySpecifier)[];
export type StandardResponseModelFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ThreadModelKeySpecifier = ('application_id' | 'id' | 'thread_comments' | 'title' | 'website_url' | ThreadModelKeySpecifier)[];
export type ThreadModelFieldPolicy = {
	application_id?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	thread_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	website_url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserModelKeySpecifier = ('applications_joined_ids' | 'confirmed' | 'created_at' | 'email' | 'id' | 'updated_at' | 'user_role' | 'username' | UserModelKeySpecifier)[];
export type UserModelFieldPolicy = {
	applications_joined_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	confirmed?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	user_role?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	ApplicationModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ApplicationModelKeySpecifier | (() => undefined | ApplicationModelKeySpecifier),
		fields?: ApplicationModelFieldPolicy,
	},
	CommentModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommentModelKeySpecifier | (() => undefined | CommentModelKeySpecifier),
		fields?: CommentModelFieldPolicy,
	},
	FetchCommentByThreadIdResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FetchCommentByThreadIdResponseKeySpecifier | (() => undefined | FetchCommentByThreadIdResponseKeySpecifier),
		fields?: FetchCommentByThreadIdResponseFieldPolicy,
	},
	LoginResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoginResponseKeySpecifier | (() => undefined | LoginResponseKeySpecifier),
		fields?: LoginResponseFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	RatingModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RatingModelKeySpecifier | (() => undefined | RatingModelKeySpecifier),
		fields?: RatingModelFieldPolicy,
	},
	StandardResponseModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StandardResponseModelKeySpecifier | (() => undefined | StandardResponseModelKeySpecifier),
		fields?: StandardResponseModelFieldPolicy,
	},
	ThreadModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ThreadModelKeySpecifier | (() => undefined | ThreadModelKeySpecifier),
		fields?: ThreadModelFieldPolicy,
	},
	UserModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserModelKeySpecifier | (() => undefined | UserModelKeySpecifier),
		fields?: UserModelFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;