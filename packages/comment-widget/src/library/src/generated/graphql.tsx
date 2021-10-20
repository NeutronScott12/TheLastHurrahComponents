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
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type AddModeratorInput = {
  application_id: Scalars['String'];
  moderator_id: Scalars['String'];
};

export type AddPinnedCommentInput = {
  comment_id: Scalars['String'];
  thread_id: Scalars['String'];
};

export type ApplicationModel = {
  __typename?: 'ApplicationModel';
  adult_content: Scalars['Boolean'];
  allow_images_and_videos_on_comments: Scalars['Boolean'];
  application_name: Scalars['String'];
  application_owner: UserModel;
  application_owner_id: Scalars['String'];
  auth_secret: Scalars['String'];
  authenticated_users: Array<UserModel>;
  authenticated_users_ids: Array<Scalars['String']>;
  category: Category;
  comment_policy_summary?: Maybe<Scalars['String']>;
  comment_policy_url?: Maybe<Scalars['String']>;
  commenters_users_ids: Array<Scalars['String']>;
  comments: Array<CommentModel>;
  cost: Scalars['Float'];
  created_at: Scalars['DateTime'];
  default_avatar_url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  display_comments_when_flagged: Scalars['Boolean'];
  email_mods_when_comments_flagged: Scalars['Boolean'];
  id: Scalars['String'];
  language: Language;
  links_in_comments: Scalars['Boolean'];
  moderators: Array<UserModel>;
  moderators_ids: Array<Scalars['String']>;
  plan: Scalars['String'];
  pre_comment_moderation: Pre_Comment_Moderation;
  renewal?: Maybe<Scalars['DateTime']>;
  short_name: Scalars['String'];
  theme: Theme;
  threads: Array<ThreadModel>;
  updated_at: Scalars['DateTime'];
  website_url?: Maybe<Scalars['String']>;
};

export type ApproveCommentsInput = {
  comment_ids: Array<Scalars['String']>;
};

export type AvatarEntity = {
  __typename?: 'AvatarEntity';
  ETag: Scalars['String'];
  created_at: Scalars['DateTime'];
  default_avatar: Scalars['Boolean'];
  encoding: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['String'];
  key: Scalars['String'];
  updated_at: Scalars['DateTime'];
  url: Scalars['String'];
};

export enum Category {
  Tech = 'TECH'
}

export type ClosePollInput = {
  poll_id: Scalars['String'];
};

export type CommentAndVoteCountEntity = {
  __typename?: 'CommentAndVoteCountEntity';
  comment_count: Scalars['Int'];
  vote_count: Scalars['Int'];
};

export type CommentModel = {
  __typename?: 'CommentModel';
  _count: CountModel;
  application_id: Scalars['String'];
  author: UserModel;
  created_at: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  down_vote: Array<RatingModel>;
  flagged: Scalars['Boolean'];
  id: Scalars['String'];
  json_body: Array<Scalars['JSONObject']>;
  parent_id?: Maybe<Scalars['String']>;
  pending: Scalars['Boolean'];
  plain_text_body: Scalars['String'];
  private_information: Scalars['Boolean'];
  replied_to_id?: Maybe<Scalars['String']>;
  replied_to_user?: Maybe<UserModel>;
  replies: Array<CommentModel>;
  reports: Array<ReportModel>;
  thread_id: Scalars['String'];
  threatening_content: Scalars['Boolean'];
  up_vote: Array<RatingModel>;
  updated_at: Scalars['DateTime'];
  user_id: Scalars['String'];
};

export type CommentsByUserIdInput = {
  user_id?: Maybe<Scalars['String']>;
};

export type CountModel = {
  __typename?: 'CountModel';
  down_vote: Scalars['Int'];
  replies: Scalars['Int'];
  up_vote: Scalars['Int'];
};

export type CreateApplicationInput = {
  adult_content: Scalars['Boolean'];
  application_name: Scalars['String'];
  application_short_name: Scalars['String'];
  category: Category;
  comment_policy_summary?: Maybe<Scalars['String']>;
  comment_policy_url?: Maybe<Scalars['String']>;
  default_avatar_url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  language: Language;
  theme: Theme;
  website_url?: Maybe<Scalars['String']>;
};

export type CreateCommentInput = {
  application_id: Scalars['String'];
  json_body: Scalars['JSONObject'];
  plain_text_body: Scalars['String'];
  thread_id: Scalars['String'];
};

export type CreateOrderInput = {
  /** Total cost */
  total_price: Scalars['Float'];
};

export type CreatePollInput = {
  options: Array<OptionInput>;
  thread_id: Scalars['String'];
  title: Scalars['String'];
};

export type CreateReplyCommentInput = {
  application_id: Scalars['String'];
  json_body: Scalars['JSONObject'];
  parent_id: Scalars['String'];
  plain_text_body: Scalars['String'];
  replied_to_id: Scalars['String'];
  thread_id: Scalars['String'];
};

export type CreateReportInput = {
  comment_id: Scalars['String'];
  report: Report_Reason;
};

export type DeleteManyCommentsInput = {
  comment_ids: Array<Scalars['String']>;
  permanent_delete: Scalars['Boolean'];
};

export type DeleteManyNotificationsInput = {
  notifications_ids: Array<Scalars['String']>;
};

export type DeleteNotificationInput = {
  id: Scalars['String'];
};

export type DeletePollInput = {
  poll_id: Scalars['String'];
  thread_id: Scalars['String'];
};

export type FetchAllComments = {
  __typename?: 'FetchAllComments';
  comments: Array<CommentModel>;
  comments_count: Scalars['Int'];
};

export type FetchApplicationByShortNameInput = {
  application_short_name: Scalars['String'];
};

export type FetchCommentAndVoteCountInput = {
  user_id: Scalars['String'];
};

export type FetchCommentByApplicationName = {
  __typename?: 'FetchCommentByApplicationName';
  comments: Array<CommentModel>;
  comments_count: Scalars['Float'];
};

export type FetchCommentByThreadIdInput = {
  application_short_name: Scalars['String'];
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  sort: Sort;
  thread_id: Scalars['String'];
};

export type FetchCommentByThreadIdResponse = {
  __typename?: 'FetchCommentByThreadIdResponse';
  comments: Array<CommentModel>;
  comments_count: Scalars['Float'];
};

export type FetchCommentsByApplicationId = {
  __typename?: 'FetchCommentsByApplicationId';
  comments: Array<CommentModel>;
  comments_count: Scalars['Float'];
};

export type FetchCommentsByApplicationIdInput = {
  application_id: Scalars['String'];
  application_short_name: Scalars['String'];
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  sort?: Maybe<Sort>;
};

export type FetchCommentsByApplicationShortNameInput = {
  application_short_name: Scalars['String'];
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  sort?: Maybe<Sort>;
  where: Where;
};

export type FetchNotificationByApplicationIdInput = {
  application_id: Scalars['String'];
};

export type FetchNotificationByApplicationShortNameInput = {
  short_name: Scalars['String'];
};

export type FetchNotificationsByUserIdInput = {
  user_id: Scalars['String'];
};

export type FetchThreadCommentsBySort = {
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  sort?: Maybe<Sort>;
};

export type FetchThreadsByUserIdInput = {
  user_id: Scalars['String'];
};

export type FindOrCreateOneThreadInput = {
  /** Application ID */
  application_id: Scalars['String'];
  /** Thread Title */
  title?: Maybe<Scalars['String']>;
  /** Thread website url */
  website_url: Scalars['String'];
};

export type FindProfileInput = {
  username: Scalars['String'];
};

export type FindThreadByIdInput = {
  thread_id: Scalars['String'];
};

export enum Language {
  English = 'ENGLISH'
}

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
  add_pinned_comment: ThreadModel;
  approve_comments: StandardResponseModel;
  block_user: StandardResponseModel;
  close_poll: PollEntity;
  confirm_user: StandardResponseModel;
  create_application: ApplicationModel;
  create_comment: CommentModel;
  create_order: StandardResponseModel;
  create_poll: PollEntity;
  create_reply_comment: CommentModel;
  create_report: StandardResponseModel;
  delete_comment: StandardResponseModel;
  delete_many_comments: StandardResponseModel;
  delete_many_notifications: StandardResponse;
  delete_notification: StandardResponse;
  delete_poll: StandardResponseModel;
  delete_user: StandardResponseModel;
  down_vote_comment: CommentModel;
  forgot_password: StandardResponseModel;
  login_user: LoginResponse;
  logout_user: StandardResponseModel;
  regenerate_new_auth_secret: ApplicationModel;
  register_user: StandardResponseModel;
  remove_application: StandardResponseModel;
  remove_application_moderator: ApplicationModel;
  reset_password: StandardResponseModel;
  unblock_user: StandardResponseModel;
  up_vote_comment: CommentModel;
  update_application: ApplicationModel;
  update_application_comment_rules: ApplicationModel;
  update_comment: CommentModel;
  update_poll_vote: PollEntity;
};


export type MutationAdd_Application_ModeratorArgs = {
  addModeratorInput: AddModeratorInput;
};


export type MutationAdd_Pinned_CommentArgs = {
  addPinnedCommentInput: AddPinnedCommentInput;
};


export type MutationApprove_CommentsArgs = {
  approveCommentsInput: ApproveCommentsInput;
};


export type MutationBlock_UserArgs = {
  user_id: Scalars['String'];
};


export type MutationClose_PollArgs = {
  closePollInput: ClosePollInput;
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


export type MutationCreate_OrderArgs = {
  CreateOrderInput: CreateOrderInput;
};


export type MutationCreate_PollArgs = {
  createPollInput: CreatePollInput;
};


export type MutationCreate_Reply_CommentArgs = {
  CreateReplyCommentInput: CreateReplyCommentInput;
};


export type MutationCreate_ReportArgs = {
  createReportInput: CreateReportInput;
};


export type MutationDelete_CommentArgs = {
  commentId: Scalars['String'];
};


export type MutationDelete_Many_CommentsArgs = {
  deleteManyCommentsInput: DeleteManyCommentsInput;
};


export type MutationDelete_Many_NotificationsArgs = {
  deleteManyNotifications: DeleteManyNotificationsInput;
};


export type MutationDelete_NotificationArgs = {
  deleteNotification: DeleteNotificationInput;
};


export type MutationDelete_PollArgs = {
  deletePollInput: DeletePollInput;
};


export type MutationDelete_UserArgs = {
  email: Scalars['String'];
};


export type MutationDown_Vote_CommentArgs = {
  comment_id: Scalars['String'];
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


export type MutationUnblock_UserArgs = {
  user_id: Scalars['String'];
};


export type MutationUp_Vote_CommentArgs = {
  comment_id: Scalars['String'];
};


export type MutationUpdate_ApplicationArgs = {
  updateApplicationInput: UpdateApplicationInput;
};


export type MutationUpdate_Application_Comment_RulesArgs = {
  updateApplicationCommentRulesInput: UpdateApplicationCommentRulesInput;
};


export type MutationUpdate_CommentArgs = {
  UpdateCommentInput: UpdateCommentInput;
};


export type MutationUpdate_Poll_VoteArgs = {
  updatePollVoteInput: UpdatePollVoteInput;
};

export type Notification = {
  __typename?: 'Notification';
  application_id?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id: Scalars['String'];
  message: Scalars['String'];
  updated_at: Scalars['DateTime'];
  url: Scalars['String'];
};

export type OptionEntity = {
  __typename?: 'OptionEntity';
  id: Scalars['String'];
  option: Scalars['String'];
  votes: Array<VoteEntity>;
};

export type OptionInput = {
  option: Scalars['String'];
};

export enum Pre_Comment_Moderation {
  All = 'ALL',
  NewComments = 'NEW_COMMENTS',
  None = 'NONE'
}

export type PollEntity = {
  __typename?: 'PollEntity';
  closed: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  id: Scalars['String'];
  options: Array<OptionEntity>;
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
  voted: Array<Scalars['String']>;
};

export type ProfileEntity = {
  __typename?: 'ProfileEntity';
  id: Scalars['String'];
  profile_comments: Array<CommentModel>;
  user: UserModel;
};

export type Query = {
  __typename?: 'Query';
  current_user: UserModel;
  fetch_all_applications: Array<ApplicationModel>;
  fetch_all_threads: Array<ThreadModel>;
  fetch_application_by_short_name: ApplicationModel;
  fetch_applications_by_owner_id: Array<ApplicationModel>;
  fetch_comment_and_vote_count: CommentAndVoteCountEntity;
  fetch_comments: FetchAllComments;
  fetch_comments_by_application_id: FetchCommentsByApplicationId;
  fetch_comments_by_application_short_name: FetchCommentByApplicationName;
  fetch_comments_by_thread_id: FetchCommentByThreadIdResponse;
  fetch_notifications: Array<Notification>;
  fetch_notifications_by_application_id: Array<Notification>;
  fetch_notifications_by_short_name: Array<Notification>;
  fetch_notifications_by_user_id: Array<Notification>;
  fetch_threads_by_user_id: Array<ThreadModel>;
  fetch_users: Array<UserModel>;
  find_one_application_by_id: ApplicationModel;
  find_one_application_by_name: ApplicationModel;
  find_one_thread_or_create_one: ThreadModel;
  find_profile: ProfileEntity;
  find_thread_by_id: ThreadModel;
  resend_email_code: StandardResponseModel;
  search_user_by_email: UserModel;
};


export type QueryFetch_Application_By_Short_NameArgs = {
  fetchApplicationByShortNameInput: FetchApplicationByShortNameInput;
};


export type QueryFetch_Comment_And_Vote_CountArgs = {
  fetchCommentAndVoteCountInput: FetchCommentAndVoteCountInput;
};


export type QueryFetch_Comments_By_Application_IdArgs = {
  fetchCommentsByApplicationId: FetchCommentsByApplicationIdInput;
};


export type QueryFetch_Comments_By_Application_Short_NameArgs = {
  fetchCommentsByApplicationShortNameInput: FetchCommentsByApplicationShortNameInput;
};


export type QueryFetch_Comments_By_Thread_IdArgs = {
  fetchCommentByThreadIdInput: FetchCommentByThreadIdInput;
};


export type QueryFetch_Notifications_By_Application_IdArgs = {
  fetchNotificationsByApplicationIdInput: FetchNotificationByApplicationIdInput;
};


export type QueryFetch_Notifications_By_Short_NameArgs = {
  fetchNotificationByApplicationShortNameInput: FetchNotificationByApplicationShortNameInput;
};


export type QueryFetch_Notifications_By_User_IdArgs = {
  fetchNotificationsByUserIdInput: FetchNotificationsByUserIdInput;
};


export type QueryFetch_Threads_By_User_IdArgs = {
  fetchThreadsByUserIdInput: FetchThreadsByUserIdInput;
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


export type QueryFind_ProfileArgs = {
  findProfileInput: FindProfileInput;
};


export type QueryFind_Thread_By_IdArgs = {
  findThreadById: FindThreadByIdInput;
};


export type QueryResend_Email_CodeArgs = {
  email: Scalars['String'];
  redirect_url: Scalars['String'];
};


export type QuerySearch_User_By_EmailArgs = {
  email: Scalars['String'];
};

export enum Report_Reason {
  Disagree = 'DISAGREE',
  InappropriateProfile = 'INAPPROPRIATE_PROFILE',
  PrivateInformation = 'PRIVATE_INFORMATION',
  Spam = 'SPAM',
  ThreateningContent = 'THREATENING_CONTENT'
}

export type RatingModel = {
  __typename?: 'RatingModel';
  author_id: Scalars['String'];
  id: Scalars['String'];
};

export type RemoveModeratorInput = {
  application_id: Scalars['String'];
  moderator_id: Scalars['String'];
};

export type ReportModel = {
  __typename?: 'ReportModel';
  created_at: Scalars['DateTime'];
  id: Scalars['String'];
  reason: Report_Reason;
  updated_at: Scalars['DateTime'];
  user_id: Scalars['String'];
};

export enum Status {
  Away = 'AWAY',
  Invisble = 'INVISBLE',
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type StandardResponse = {
  __typename?: 'StandardResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type StandardResponseModel = {
  __typename?: 'StandardResponseModel';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export enum Theme {
  Auto = 'AUTO',
  Dark = 'DARK',
  Light = 'LIGHT'
}

export type ThreadModel = {
  __typename?: 'ThreadModel';
  application_id: Scalars['String'];
  commenters_ids: Array<Scalars['String']>;
  /** UUID for Thread */
  id: Scalars['String'];
  parent_application: ApplicationModel;
  pinned_comment?: Maybe<CommentModel>;
  pinned_comment_id?: Maybe<Scalars['String']>;
  poll?: Maybe<PollEntity>;
  thread_comments: FetchCommentByThreadIdResponse;
  title: Scalars['String'];
  website_url: Scalars['String'];
};


export type ThreadModelThread_CommentsArgs = {
  commentsByUserIdInput?: Maybe<CommentsByUserIdInput>;
  fetchThreadCommentsBySort: FetchThreadCommentsBySort;
};

export type UpdateApplicationCommentRulesInput = {
  allow_images_and_videos_on_comments: Scalars['Boolean'];
  application_short_name: Scalars['String'];
  display_comments_when_flagged: Scalars['Boolean'];
  email_mods_when_comments_flagged: Scalars['Boolean'];
  links_in_comments: Scalars['Boolean'];
  pre_comment_moderation: Pre_Comment_Moderation;
};

export type UpdateApplicationInput = {
  adult_content: Scalars['Boolean'];
  application_short_name: Scalars['String'];
  category: Category;
  comment_policy_summary?: Maybe<Scalars['String']>;
  comment_policy_url?: Maybe<Scalars['String']>;
  default_avatar_url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  language: Language;
  theme: Theme;
  website_url?: Maybe<Scalars['String']>;
};

export type UpdateCommentInput = {
  comment_id: Scalars['String'];
  json_body: Scalars['JSONObject'];
  plain_text_body: Scalars['String'];
};

export type UpdatePollVoteInput = {
  options_id: Scalars['String'];
  poll_id: Scalars['String'];
};

export type UserModel = {
  __typename?: 'UserModel';
  applications_joined_ids: Array<Scalars['String']>;
  avatar: AvatarEntity;
  blocked_users: Array<UserModel>;
  confirmed: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  last_active: Scalars['DateTime'];
  status: Status;
  updated_at: Scalars['DateTime'];
  user_role: Scalars['String'];
  username: Scalars['String'];
};

export type VoteEntity = {
  __typename?: 'VoteEntity';
  id: Scalars['String'];
  user_id: Scalars['String'];
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC',
  TopVotes = 'TOP_VOTES'
}

export enum Where {
  All = 'ALL',
  Appoved = 'APPOVED',
  Deleted = 'DELETED',
  Pending = 'PENDING',
  Spam = 'SPAM'
}

export type ThreadFragmentFragment = { __typename?: 'ThreadModel', id: string, application_id: string, title: string, website_url: string, poll?: { __typename?: 'PollEntity', id: string, title: string, created_at: any, updated_at: any, closed: boolean, voted: Array<string>, options: Array<{ __typename?: 'OptionEntity', id: string, option: string, votes: Array<{ __typename?: 'VoteEntity', id: string, user_id: string }> }> } | null | undefined, pinned_comment?: { __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, author: { __typename?: 'UserModel', username: string, id: string } } | null | undefined };

export type PollFragmentFragment = { __typename?: 'PollEntity', id: string, title: string, created_at: any, updated_at: any, closed: boolean, voted: Array<string>, options: Array<{ __typename?: 'OptionEntity', id: string, option: string, votes: Array<{ __typename?: 'VoteEntity', id: string, user_id: string }> }> };

export type FindOneOrCreateOneThreadQueryVariables = Exact<{
  findOrCreateOneThreadInput: FindOrCreateOneThreadInput;
}>;


export type FindOneOrCreateOneThreadQuery = { __typename?: 'Query', find_one_thread_or_create_one: { __typename?: 'ThreadModel', id: string, application_id: string, title: string, website_url: string, poll?: { __typename?: 'PollEntity', id: string, title: string, created_at: any, updated_at: any, closed: boolean, voted: Array<string>, options: Array<{ __typename?: 'OptionEntity', id: string, option: string, votes: Array<{ __typename?: 'VoteEntity', id: string, user_id: string }> }> } | null | undefined, pinned_comment?: { __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, author: { __typename?: 'UserModel', username: string, id: string } } | null | undefined } };

export type FindThreadByIdQueryVariables = Exact<{
  findThreadById: FindThreadByIdInput;
}>;


export type FindThreadByIdQuery = { __typename?: 'Query', find_thread_by_id: { __typename?: 'ThreadModel', id: string, application_id: string, title: string, website_url: string, poll?: { __typename?: 'PollEntity', id: string, title: string, created_at: any, updated_at: any, closed: boolean, voted: Array<string>, options: Array<{ __typename?: 'OptionEntity', id: string, option: string, votes: Array<{ __typename?: 'VoteEntity', id: string, user_id: string }> }> } | null | undefined, pinned_comment?: { __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, author: { __typename?: 'UserModel', username: string, id: string } } | null | undefined } };

export type FindOneApplicationByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindOneApplicationByIdQuery = { __typename?: 'Query', find_one_application_by_id: { __typename?: 'ApplicationModel', id: string, application_name: string, short_name: string, application_owner: { __typename?: 'UserModel', username: string }, moderators: Array<{ __typename?: 'UserModel', username: string, id: string }> } };

export type CommentFragmentFragment = { __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined };

export type FetchCommentByThreadIdQueryVariables = Exact<{
  fetchCommentByThreadIdInput: FetchCommentByThreadIdInput;
}>;


export type FetchCommentByThreadIdQuery = { __typename?: 'Query', fetch_comments_by_thread_id: { __typename?: 'FetchCommentByThreadIdResponse', comments_count: number, comments: Array<{ __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, replies: Array<{ __typename?: 'CommentModel', parent_id?: string | null | undefined, application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, pending: boolean, replies: Array<{ __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined }>, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined }>, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined }> } };

export type CreateThreadComentMutationVariables = Exact<{
  createCommentInput: CreateCommentInput;
}>;


export type CreateThreadComentMutation = { __typename?: 'Mutation', create_comment: { __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, replies: Array<{ __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, replies: Array<{ __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined }>, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined }>, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined } };

export type DeleteThreadCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type DeleteThreadCommentMutation = { __typename?: 'Mutation', delete_comment: { __typename?: 'StandardResponseModel', success: boolean, message: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', current_user: { __typename?: 'UserModel', id: string, username: string } };

export type CreateReplyCommentMutationVariables = Exact<{
  CreateReplyCommentInput: CreateReplyCommentInput;
}>;


export type CreateReplyCommentMutation = { __typename?: 'Mutation', create_reply_comment: { __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, replies: Array<{ __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, replies: Array<{ __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined }>, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined }>, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined } };

export type EditThreadCommentMutationVariables = Exact<{
  UpdateCommentInput: UpdateCommentInput;
}>;


export type EditThreadCommentMutation = { __typename?: 'Mutation', update_comment: { __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, replies: Array<{ __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, replies: Array<{ __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined }>, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined }>, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined } };

export type UpVoteCommentMutationVariables = Exact<{
  comment_id: Scalars['String'];
}>;


export type UpVoteCommentMutation = { __typename?: 'Mutation', up_vote_comment: { __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, replies: Array<{ __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, replies: Array<{ __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined }>, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined }>, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined } };

export type DownVoteCommentMutationVariables = Exact<{
  comment_id: Scalars['String'];
}>;


export type DownVoteCommentMutation = { __typename?: 'Mutation', down_vote_comment: { __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, replies: Array<{ __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, replies: Array<{ __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, pending: boolean, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined }>, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined }>, author: { __typename?: 'UserModel', username: string, id: string }, _count: { __typename?: 'CountModel', down_vote: number, replies: number, up_vote: number }, replied_to_user?: { __typename?: 'UserModel', username: string } | null | undefined } };

export type BlockUserMutationVariables = Exact<{
  user_id: Scalars['String'];
}>;


export type BlockUserMutation = { __typename?: 'Mutation', block_user: { __typename?: 'StandardResponseModel', success: boolean, message: string } };

export type UnBlockUserMutationVariables = Exact<{
  user_id: Scalars['String'];
}>;


export type UnBlockUserMutation = { __typename?: 'Mutation', unblock_user: { __typename?: 'StandardResponseModel', success: boolean, message: string } };

export type CreateReportMutationVariables = Exact<{
  createReportInput: CreateReportInput;
}>;


export type CreateReportMutation = { __typename?: 'Mutation', create_report: { __typename?: 'StandardResponseModel', success: boolean, message: string } };

export type AddPinnedCommentMutationVariables = Exact<{
  addPinnedCommentInput: AddPinnedCommentInput;
}>;


export type AddPinnedCommentMutation = { __typename?: 'Mutation', add_pinned_comment: { __typename?: 'ThreadModel', id: string, application_id: string, title: string, website_url: string, poll?: { __typename?: 'PollEntity', id: string, title: string, created_at: any, updated_at: any, closed: boolean, voted: Array<string>, options: Array<{ __typename?: 'OptionEntity', id: string, option: string, votes: Array<{ __typename?: 'VoteEntity', id: string, user_id: string }> }> } | null | undefined, pinned_comment?: { __typename?: 'CommentModel', application_id: string, plain_text_body: string, json_body: Array<any>, id: string, thread_id: string, created_at: any, updated_at: any, user_id: string, parent_id?: string | null | undefined, author: { __typename?: 'UserModel', username: string, id: string } } | null | undefined } };

export type CreatePollMutationMutationVariables = Exact<{
  createPollInput: CreatePollInput;
}>;


export type CreatePollMutationMutation = { __typename?: 'Mutation', create_poll: { __typename?: 'PollEntity', id: string, title: string, created_at: any, updated_at: any, closed: boolean, voted: Array<string>, options: Array<{ __typename?: 'OptionEntity', id: string, option: string, votes: Array<{ __typename?: 'VoteEntity', id: string, user_id: string }> }> } };

export type UpdatePollVoteMutationVariables = Exact<{
  updatePollVoteInput: UpdatePollVoteInput;
}>;


export type UpdatePollVoteMutation = { __typename?: 'Mutation', update_poll_vote: { __typename?: 'PollEntity', id: string, title: string, created_at: any, updated_at: any, closed: boolean, voted: Array<string>, options: Array<{ __typename?: 'OptionEntity', id: string, option: string, votes: Array<{ __typename?: 'VoteEntity', id: string, user_id: string }> }> } };

export type DeletePollMutationVariables = Exact<{
  deletePollInput: DeletePollInput;
}>;


export type DeletePollMutation = { __typename?: 'Mutation', delete_poll: { __typename?: 'StandardResponseModel', success: boolean, message: string } };

export type ClosePollMutationVariables = Exact<{
  closePollInput: ClosePollInput;
}>;


export type ClosePollMutation = { __typename?: 'Mutation', close_poll: { __typename?: 'PollEntity', id: string, title: string, created_at: any, updated_at: any, closed: boolean, voted: Array<string>, options: Array<{ __typename?: 'OptionEntity', id: string, option: string, votes: Array<{ __typename?: 'VoteEntity', id: string, user_id: string }> }> } };

export const PollFragmentFragmentDoc = gql`
    fragment PollFragment on PollEntity {
  id
  title
  created_at
  updated_at
  closed
  voted
  options {
    id
    option
    votes {
      id
      user_id
    }
  }
}
    `;
export const ThreadFragmentFragmentDoc = gql`
    fragment ThreadFragment on ThreadModel {
  id
  application_id
  title
  website_url
  poll {
    ...PollFragment
  }
  pinned_comment {
    application_id
    author {
      username
      id
    }
    plain_text_body
    json_body
    id
    thread_id
    created_at
    updated_at
    user_id
    parent_id
  }
}
    ${PollFragmentFragmentDoc}`;
export const CommentFragmentFragmentDoc = gql`
    fragment CommentFragment on CommentModel {
  application_id
  author {
    username
    id
  }
  plain_text_body
  json_body
  id
  thread_id
  created_at
  updated_at
  user_id
  parent_id
  pending
  _count {
    down_vote
    replies
    up_vote
  }
  replied_to_user {
    username
  }
}
    `;
export const FindOneOrCreateOneThreadDocument = gql`
    query FindOneOrCreateOneThread($findOrCreateOneThreadInput: FindOrCreateOneThreadInput!) {
  find_one_thread_or_create_one(
    findOrCreateOneThreadInput: $findOrCreateOneThreadInput
  ) {
    ...ThreadFragment
  }
}
    ${ThreadFragmentFragmentDoc}`;

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
export const FindThreadByIdDocument = gql`
    query FindThreadById($findThreadById: FindThreadByIdInput!) {
  find_thread_by_id(findThreadById: $findThreadById) {
    ...ThreadFragment
  }
}
    ${ThreadFragmentFragmentDoc}`;

/**
 * __useFindThreadByIdQuery__
 *
 * To run a query within a React component, call `useFindThreadByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindThreadByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindThreadByIdQuery({
 *   variables: {
 *      findThreadById: // value for 'findThreadById'
 *   },
 * });
 */
export function useFindThreadByIdQuery(baseOptions: Apollo.QueryHookOptions<FindThreadByIdQuery, FindThreadByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindThreadByIdQuery, FindThreadByIdQueryVariables>(FindThreadByIdDocument, options);
      }
export function useFindThreadByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindThreadByIdQuery, FindThreadByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindThreadByIdQuery, FindThreadByIdQueryVariables>(FindThreadByIdDocument, options);
        }
export type FindThreadByIdQueryHookResult = ReturnType<typeof useFindThreadByIdQuery>;
export type FindThreadByIdLazyQueryHookResult = ReturnType<typeof useFindThreadByIdLazyQuery>;
export type FindThreadByIdQueryResult = Apollo.QueryResult<FindThreadByIdQuery, FindThreadByIdQueryVariables>;
export const FindOneApplicationByIdDocument = gql`
    query FindOneApplicationById($id: String!) {
  find_one_application_by_id(id: $id) {
    id
    application_name
    short_name
    application_owner {
      username
    }
    moderators {
      username
      id
    }
  }
}
    `;

/**
 * __useFindOneApplicationByIdQuery__
 *
 * To run a query within a React component, call `useFindOneApplicationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneApplicationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneApplicationByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneApplicationByIdQuery(baseOptions: Apollo.QueryHookOptions<FindOneApplicationByIdQuery, FindOneApplicationByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneApplicationByIdQuery, FindOneApplicationByIdQueryVariables>(FindOneApplicationByIdDocument, options);
      }
export function useFindOneApplicationByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneApplicationByIdQuery, FindOneApplicationByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneApplicationByIdQuery, FindOneApplicationByIdQueryVariables>(FindOneApplicationByIdDocument, options);
        }
export type FindOneApplicationByIdQueryHookResult = ReturnType<typeof useFindOneApplicationByIdQuery>;
export type FindOneApplicationByIdLazyQueryHookResult = ReturnType<typeof useFindOneApplicationByIdLazyQuery>;
export type FindOneApplicationByIdQueryResult = Apollo.QueryResult<FindOneApplicationByIdQuery, FindOneApplicationByIdQueryVariables>;
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
        parent_id
        replies {
          ...CommentFragment
        }
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
      replies {
        ...CommentFragment
      }
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
    username
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
export const CreateReplyCommentDocument = gql`
    mutation CreateReplyComment($CreateReplyCommentInput: CreateReplyCommentInput!) {
  create_reply_comment(CreateReplyCommentInput: $CreateReplyCommentInput) {
    ...CommentFragment
    replies {
      ...CommentFragment
      replies {
        ...CommentFragment
      }
    }
  }
}
    ${CommentFragmentFragmentDoc}`;
export type CreateReplyCommentMutationFn = Apollo.MutationFunction<CreateReplyCommentMutation, CreateReplyCommentMutationVariables>;

/**
 * __useCreateReplyCommentMutation__
 *
 * To run a mutation, you first call `useCreateReplyCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReplyCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReplyCommentMutation, { data, loading, error }] = useCreateReplyCommentMutation({
 *   variables: {
 *      CreateReplyCommentInput: // value for 'CreateReplyCommentInput'
 *   },
 * });
 */
export function useCreateReplyCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateReplyCommentMutation, CreateReplyCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReplyCommentMutation, CreateReplyCommentMutationVariables>(CreateReplyCommentDocument, options);
      }
export type CreateReplyCommentMutationHookResult = ReturnType<typeof useCreateReplyCommentMutation>;
export type CreateReplyCommentMutationResult = Apollo.MutationResult<CreateReplyCommentMutation>;
export type CreateReplyCommentMutationOptions = Apollo.BaseMutationOptions<CreateReplyCommentMutation, CreateReplyCommentMutationVariables>;
export const EditThreadCommentDocument = gql`
    mutation EditThreadComment($UpdateCommentInput: UpdateCommentInput!) {
  update_comment(UpdateCommentInput: $UpdateCommentInput) {
    ...CommentFragment
    replies {
      ...CommentFragment
      replies {
        ...CommentFragment
      }
    }
  }
}
    ${CommentFragmentFragmentDoc}`;
export type EditThreadCommentMutationFn = Apollo.MutationFunction<EditThreadCommentMutation, EditThreadCommentMutationVariables>;

/**
 * __useEditThreadCommentMutation__
 *
 * To run a mutation, you first call `useEditThreadCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditThreadCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editThreadCommentMutation, { data, loading, error }] = useEditThreadCommentMutation({
 *   variables: {
 *      UpdateCommentInput: // value for 'UpdateCommentInput'
 *   },
 * });
 */
export function useEditThreadCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditThreadCommentMutation, EditThreadCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditThreadCommentMutation, EditThreadCommentMutationVariables>(EditThreadCommentDocument, options);
      }
export type EditThreadCommentMutationHookResult = ReturnType<typeof useEditThreadCommentMutation>;
export type EditThreadCommentMutationResult = Apollo.MutationResult<EditThreadCommentMutation>;
export type EditThreadCommentMutationOptions = Apollo.BaseMutationOptions<EditThreadCommentMutation, EditThreadCommentMutationVariables>;
export const UpVoteCommentDocument = gql`
    mutation UpVoteComment($comment_id: String!) {
  up_vote_comment(comment_id: $comment_id) {
    ...CommentFragment
    replies {
      ...CommentFragment
      replies {
        ...CommentFragment
      }
    }
  }
}
    ${CommentFragmentFragmentDoc}`;
export type UpVoteCommentMutationFn = Apollo.MutationFunction<UpVoteCommentMutation, UpVoteCommentMutationVariables>;

/**
 * __useUpVoteCommentMutation__
 *
 * To run a mutation, you first call `useUpVoteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpVoteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upVoteCommentMutation, { data, loading, error }] = useUpVoteCommentMutation({
 *   variables: {
 *      comment_id: // value for 'comment_id'
 *   },
 * });
 */
export function useUpVoteCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpVoteCommentMutation, UpVoteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpVoteCommentMutation, UpVoteCommentMutationVariables>(UpVoteCommentDocument, options);
      }
export type UpVoteCommentMutationHookResult = ReturnType<typeof useUpVoteCommentMutation>;
export type UpVoteCommentMutationResult = Apollo.MutationResult<UpVoteCommentMutation>;
export type UpVoteCommentMutationOptions = Apollo.BaseMutationOptions<UpVoteCommentMutation, UpVoteCommentMutationVariables>;
export const DownVoteCommentDocument = gql`
    mutation DownVoteComment($comment_id: String!) {
  down_vote_comment(comment_id: $comment_id) {
    ...CommentFragment
    replies {
      ...CommentFragment
      replies {
        ...CommentFragment
      }
    }
  }
}
    ${CommentFragmentFragmentDoc}`;
export type DownVoteCommentMutationFn = Apollo.MutationFunction<DownVoteCommentMutation, DownVoteCommentMutationVariables>;

/**
 * __useDownVoteCommentMutation__
 *
 * To run a mutation, you first call `useDownVoteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDownVoteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [downVoteCommentMutation, { data, loading, error }] = useDownVoteCommentMutation({
 *   variables: {
 *      comment_id: // value for 'comment_id'
 *   },
 * });
 */
export function useDownVoteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DownVoteCommentMutation, DownVoteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DownVoteCommentMutation, DownVoteCommentMutationVariables>(DownVoteCommentDocument, options);
      }
export type DownVoteCommentMutationHookResult = ReturnType<typeof useDownVoteCommentMutation>;
export type DownVoteCommentMutationResult = Apollo.MutationResult<DownVoteCommentMutation>;
export type DownVoteCommentMutationOptions = Apollo.BaseMutationOptions<DownVoteCommentMutation, DownVoteCommentMutationVariables>;
export const BlockUserDocument = gql`
    mutation BlockUser($user_id: String!) {
  block_user(user_id: $user_id) {
    success
    message
  }
}
    `;
export type BlockUserMutationFn = Apollo.MutationFunction<BlockUserMutation, BlockUserMutationVariables>;

/**
 * __useBlockUserMutation__
 *
 * To run a mutation, you first call `useBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockUserMutation, { data, loading, error }] = useBlockUserMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useBlockUserMutation(baseOptions?: Apollo.MutationHookOptions<BlockUserMutation, BlockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BlockUserMutation, BlockUserMutationVariables>(BlockUserDocument, options);
      }
export type BlockUserMutationHookResult = ReturnType<typeof useBlockUserMutation>;
export type BlockUserMutationResult = Apollo.MutationResult<BlockUserMutation>;
export type BlockUserMutationOptions = Apollo.BaseMutationOptions<BlockUserMutation, BlockUserMutationVariables>;
export const UnBlockUserDocument = gql`
    mutation UnBlockUser($user_id: String!) {
  unblock_user(user_id: $user_id) {
    success
    message
  }
}
    `;
export type UnBlockUserMutationFn = Apollo.MutationFunction<UnBlockUserMutation, UnBlockUserMutationVariables>;

/**
 * __useUnBlockUserMutation__
 *
 * To run a mutation, you first call `useUnBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unBlockUserMutation, { data, loading, error }] = useUnBlockUserMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useUnBlockUserMutation(baseOptions?: Apollo.MutationHookOptions<UnBlockUserMutation, UnBlockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnBlockUserMutation, UnBlockUserMutationVariables>(UnBlockUserDocument, options);
      }
export type UnBlockUserMutationHookResult = ReturnType<typeof useUnBlockUserMutation>;
export type UnBlockUserMutationResult = Apollo.MutationResult<UnBlockUserMutation>;
export type UnBlockUserMutationOptions = Apollo.BaseMutationOptions<UnBlockUserMutation, UnBlockUserMutationVariables>;
export const CreateReportDocument = gql`
    mutation CreateReport($createReportInput: CreateReportInput!) {
  create_report(createReportInput: $createReportInput) {
    success
    message
  }
}
    `;
export type CreateReportMutationFn = Apollo.MutationFunction<CreateReportMutation, CreateReportMutationVariables>;

/**
 * __useCreateReportMutation__
 *
 * To run a mutation, you first call `useCreateReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReportMutation, { data, loading, error }] = useCreateReportMutation({
 *   variables: {
 *      createReportInput: // value for 'createReportInput'
 *   },
 * });
 */
export function useCreateReportMutation(baseOptions?: Apollo.MutationHookOptions<CreateReportMutation, CreateReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReportMutation, CreateReportMutationVariables>(CreateReportDocument, options);
      }
export type CreateReportMutationHookResult = ReturnType<typeof useCreateReportMutation>;
export type CreateReportMutationResult = Apollo.MutationResult<CreateReportMutation>;
export type CreateReportMutationOptions = Apollo.BaseMutationOptions<CreateReportMutation, CreateReportMutationVariables>;
export const AddPinnedCommentDocument = gql`
    mutation AddPinnedComment($addPinnedCommentInput: AddPinnedCommentInput!) {
  add_pinned_comment(addPinnedCommentInput: $addPinnedCommentInput) {
    ...ThreadFragment
  }
}
    ${ThreadFragmentFragmentDoc}`;
export type AddPinnedCommentMutationFn = Apollo.MutationFunction<AddPinnedCommentMutation, AddPinnedCommentMutationVariables>;

/**
 * __useAddPinnedCommentMutation__
 *
 * To run a mutation, you first call `useAddPinnedCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPinnedCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPinnedCommentMutation, { data, loading, error }] = useAddPinnedCommentMutation({
 *   variables: {
 *      addPinnedCommentInput: // value for 'addPinnedCommentInput'
 *   },
 * });
 */
export function useAddPinnedCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddPinnedCommentMutation, AddPinnedCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPinnedCommentMutation, AddPinnedCommentMutationVariables>(AddPinnedCommentDocument, options);
      }
export type AddPinnedCommentMutationHookResult = ReturnType<typeof useAddPinnedCommentMutation>;
export type AddPinnedCommentMutationResult = Apollo.MutationResult<AddPinnedCommentMutation>;
export type AddPinnedCommentMutationOptions = Apollo.BaseMutationOptions<AddPinnedCommentMutation, AddPinnedCommentMutationVariables>;
export const CreatePollMutationDocument = gql`
    mutation CreatePollMutation($createPollInput: CreatePollInput!) {
  create_poll(createPollInput: $createPollInput) {
    ...PollFragment
  }
}
    ${PollFragmentFragmentDoc}`;
export type CreatePollMutationMutationFn = Apollo.MutationFunction<CreatePollMutationMutation, CreatePollMutationMutationVariables>;

/**
 * __useCreatePollMutationMutation__
 *
 * To run a mutation, you first call `useCreatePollMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePollMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPollMutationMutation, { data, loading, error }] = useCreatePollMutationMutation({
 *   variables: {
 *      createPollInput: // value for 'createPollInput'
 *   },
 * });
 */
export function useCreatePollMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreatePollMutationMutation, CreatePollMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePollMutationMutation, CreatePollMutationMutationVariables>(CreatePollMutationDocument, options);
      }
export type CreatePollMutationMutationHookResult = ReturnType<typeof useCreatePollMutationMutation>;
export type CreatePollMutationMutationResult = Apollo.MutationResult<CreatePollMutationMutation>;
export type CreatePollMutationMutationOptions = Apollo.BaseMutationOptions<CreatePollMutationMutation, CreatePollMutationMutationVariables>;
export const UpdatePollVoteDocument = gql`
    mutation UpdatePollVote($updatePollVoteInput: UpdatePollVoteInput!) {
  update_poll_vote(updatePollVoteInput: $updatePollVoteInput) {
    ...PollFragment
  }
}
    ${PollFragmentFragmentDoc}`;
export type UpdatePollVoteMutationFn = Apollo.MutationFunction<UpdatePollVoteMutation, UpdatePollVoteMutationVariables>;

/**
 * __useUpdatePollVoteMutation__
 *
 * To run a mutation, you first call `useUpdatePollVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePollVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePollVoteMutation, { data, loading, error }] = useUpdatePollVoteMutation({
 *   variables: {
 *      updatePollVoteInput: // value for 'updatePollVoteInput'
 *   },
 * });
 */
export function useUpdatePollVoteMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePollVoteMutation, UpdatePollVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePollVoteMutation, UpdatePollVoteMutationVariables>(UpdatePollVoteDocument, options);
      }
export type UpdatePollVoteMutationHookResult = ReturnType<typeof useUpdatePollVoteMutation>;
export type UpdatePollVoteMutationResult = Apollo.MutationResult<UpdatePollVoteMutation>;
export type UpdatePollVoteMutationOptions = Apollo.BaseMutationOptions<UpdatePollVoteMutation, UpdatePollVoteMutationVariables>;
export const DeletePollDocument = gql`
    mutation DeletePoll($deletePollInput: DeletePollInput!) {
  delete_poll(deletePollInput: $deletePollInput) {
    success
    message
  }
}
    `;
export type DeletePollMutationFn = Apollo.MutationFunction<DeletePollMutation, DeletePollMutationVariables>;

/**
 * __useDeletePollMutation__
 *
 * To run a mutation, you first call `useDeletePollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePollMutation, { data, loading, error }] = useDeletePollMutation({
 *   variables: {
 *      deletePollInput: // value for 'deletePollInput'
 *   },
 * });
 */
export function useDeletePollMutation(baseOptions?: Apollo.MutationHookOptions<DeletePollMutation, DeletePollMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePollMutation, DeletePollMutationVariables>(DeletePollDocument, options);
      }
export type DeletePollMutationHookResult = ReturnType<typeof useDeletePollMutation>;
export type DeletePollMutationResult = Apollo.MutationResult<DeletePollMutation>;
export type DeletePollMutationOptions = Apollo.BaseMutationOptions<DeletePollMutation, DeletePollMutationVariables>;
export const ClosePollDocument = gql`
    mutation ClosePoll($closePollInput: ClosePollInput!) {
  close_poll(closePollInput: $closePollInput) {
    ...PollFragment
  }
}
    ${PollFragmentFragmentDoc}`;
export type ClosePollMutationFn = Apollo.MutationFunction<ClosePollMutation, ClosePollMutationVariables>;

/**
 * __useClosePollMutation__
 *
 * To run a mutation, you first call `useClosePollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClosePollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closePollMutation, { data, loading, error }] = useClosePollMutation({
 *   variables: {
 *      closePollInput: // value for 'closePollInput'
 *   },
 * });
 */
export function useClosePollMutation(baseOptions?: Apollo.MutationHookOptions<ClosePollMutation, ClosePollMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClosePollMutation, ClosePollMutationVariables>(ClosePollDocument, options);
      }
export type ClosePollMutationHookResult = ReturnType<typeof useClosePollMutation>;
export type ClosePollMutationResult = Apollo.MutationResult<ClosePollMutation>;
export type ClosePollMutationOptions = Apollo.BaseMutationOptions<ClosePollMutation, ClosePollMutationVariables>;
export type ApplicationModelKeySpecifier = ('adult_content' | 'allow_images_and_videos_on_comments' | 'application_name' | 'application_owner' | 'application_owner_id' | 'auth_secret' | 'authenticated_users' | 'authenticated_users_ids' | 'category' | 'comment_policy_summary' | 'comment_policy_url' | 'commenters_users_ids' | 'comments' | 'cost' | 'created_at' | 'default_avatar_url' | 'description' | 'display_comments_when_flagged' | 'email_mods_when_comments_flagged' | 'id' | 'language' | 'links_in_comments' | 'moderators' | 'moderators_ids' | 'plan' | 'pre_comment_moderation' | 'renewal' | 'short_name' | 'theme' | 'threads' | 'updated_at' | 'website_url' | ApplicationModelKeySpecifier)[];
export type ApplicationModelFieldPolicy = {
	adult_content?: FieldPolicy<any> | FieldReadFunction<any>,
	allow_images_and_videos_on_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	application_name?: FieldPolicy<any> | FieldReadFunction<any>,
	application_owner?: FieldPolicy<any> | FieldReadFunction<any>,
	application_owner_id?: FieldPolicy<any> | FieldReadFunction<any>,
	auth_secret?: FieldPolicy<any> | FieldReadFunction<any>,
	authenticated_users?: FieldPolicy<any> | FieldReadFunction<any>,
	authenticated_users_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	comment_policy_summary?: FieldPolicy<any> | FieldReadFunction<any>,
	comment_policy_url?: FieldPolicy<any> | FieldReadFunction<any>,
	commenters_users_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	cost?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	default_avatar_url?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	display_comments_when_flagged?: FieldPolicy<any> | FieldReadFunction<any>,
	email_mods_when_comments_flagged?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	language?: FieldPolicy<any> | FieldReadFunction<any>,
	links_in_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	moderators?: FieldPolicy<any> | FieldReadFunction<any>,
	moderators_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	plan?: FieldPolicy<any> | FieldReadFunction<any>,
	pre_comment_moderation?: FieldPolicy<any> | FieldReadFunction<any>,
	renewal?: FieldPolicy<any> | FieldReadFunction<any>,
	short_name?: FieldPolicy<any> | FieldReadFunction<any>,
	theme?: FieldPolicy<any> | FieldReadFunction<any>,
	threads?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	website_url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AvatarEntityKeySpecifier = ('ETag' | 'created_at' | 'default_avatar' | 'encoding' | 'filename' | 'id' | 'key' | 'updated_at' | 'url' | AvatarEntityKeySpecifier)[];
export type AvatarEntityFieldPolicy = {
	ETag?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	default_avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	encoding?: FieldPolicy<any> | FieldReadFunction<any>,
	filename?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommentAndVoteCountEntityKeySpecifier = ('comment_count' | 'vote_count' | CommentAndVoteCountEntityKeySpecifier)[];
export type CommentAndVoteCountEntityFieldPolicy = {
	comment_count?: FieldPolicy<any> | FieldReadFunction<any>,
	vote_count?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommentModelKeySpecifier = ('_count' | 'application_id' | 'author' | 'created_at' | 'deleted' | 'down_vote' | 'flagged' | 'id' | 'json_body' | 'parent_id' | 'pending' | 'plain_text_body' | 'private_information' | 'replied_to_id' | 'replied_to_user' | 'replies' | 'reports' | 'thread_id' | 'threatening_content' | 'up_vote' | 'updated_at' | 'user_id' | CommentModelKeySpecifier)[];
export type CommentModelFieldPolicy = {
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	application_id?: FieldPolicy<any> | FieldReadFunction<any>,
	author?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	deleted?: FieldPolicy<any> | FieldReadFunction<any>,
	down_vote?: FieldPolicy<any> | FieldReadFunction<any>,
	flagged?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	json_body?: FieldPolicy<any> | FieldReadFunction<any>,
	parent_id?: FieldPolicy<any> | FieldReadFunction<any>,
	pending?: FieldPolicy<any> | FieldReadFunction<any>,
	plain_text_body?: FieldPolicy<any> | FieldReadFunction<any>,
	private_information?: FieldPolicy<any> | FieldReadFunction<any>,
	replied_to_id?: FieldPolicy<any> | FieldReadFunction<any>,
	replied_to_user?: FieldPolicy<any> | FieldReadFunction<any>,
	replies?: FieldPolicy<any> | FieldReadFunction<any>,
	reports?: FieldPolicy<any> | FieldReadFunction<any>,
	thread_id?: FieldPolicy<any> | FieldReadFunction<any>,
	threatening_content?: FieldPolicy<any> | FieldReadFunction<any>,
	up_vote?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CountModelKeySpecifier = ('down_vote' | 'replies' | 'up_vote' | CountModelKeySpecifier)[];
export type CountModelFieldPolicy = {
	down_vote?: FieldPolicy<any> | FieldReadFunction<any>,
	replies?: FieldPolicy<any> | FieldReadFunction<any>,
	up_vote?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FetchAllCommentsKeySpecifier = ('comments' | 'comments_count' | FetchAllCommentsKeySpecifier)[];
export type FetchAllCommentsFieldPolicy = {
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	comments_count?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FetchCommentByApplicationNameKeySpecifier = ('comments' | 'comments_count' | FetchCommentByApplicationNameKeySpecifier)[];
export type FetchCommentByApplicationNameFieldPolicy = {
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	comments_count?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FetchCommentByThreadIdResponseKeySpecifier = ('comments' | 'comments_count' | FetchCommentByThreadIdResponseKeySpecifier)[];
export type FetchCommentByThreadIdResponseFieldPolicy = {
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	comments_count?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FetchCommentsByApplicationIdKeySpecifier = ('comments' | 'comments_count' | FetchCommentsByApplicationIdKeySpecifier)[];
export type FetchCommentsByApplicationIdFieldPolicy = {
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
export type MutationKeySpecifier = ('add_application_moderator' | 'add_pinned_comment' | 'approve_comments' | 'block_user' | 'close_poll' | 'confirm_user' | 'create_application' | 'create_comment' | 'create_order' | 'create_poll' | 'create_reply_comment' | 'create_report' | 'delete_comment' | 'delete_many_comments' | 'delete_many_notifications' | 'delete_notification' | 'delete_poll' | 'delete_user' | 'down_vote_comment' | 'forgot_password' | 'login_user' | 'logout_user' | 'regenerate_new_auth_secret' | 'register_user' | 'remove_application' | 'remove_application_moderator' | 'reset_password' | 'unblock_user' | 'up_vote_comment' | 'update_application' | 'update_application_comment_rules' | 'update_comment' | 'update_poll_vote' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	add_application_moderator?: FieldPolicy<any> | FieldReadFunction<any>,
	add_pinned_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	approve_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	block_user?: FieldPolicy<any> | FieldReadFunction<any>,
	close_poll?: FieldPolicy<any> | FieldReadFunction<any>,
	confirm_user?: FieldPolicy<any> | FieldReadFunction<any>,
	create_application?: FieldPolicy<any> | FieldReadFunction<any>,
	create_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	create_order?: FieldPolicy<any> | FieldReadFunction<any>,
	create_poll?: FieldPolicy<any> | FieldReadFunction<any>,
	create_reply_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	create_report?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_many_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_many_notifications?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_notification?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_poll?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_user?: FieldPolicy<any> | FieldReadFunction<any>,
	down_vote_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	forgot_password?: FieldPolicy<any> | FieldReadFunction<any>,
	login_user?: FieldPolicy<any> | FieldReadFunction<any>,
	logout_user?: FieldPolicy<any> | FieldReadFunction<any>,
	regenerate_new_auth_secret?: FieldPolicy<any> | FieldReadFunction<any>,
	register_user?: FieldPolicy<any> | FieldReadFunction<any>,
	remove_application?: FieldPolicy<any> | FieldReadFunction<any>,
	remove_application_moderator?: FieldPolicy<any> | FieldReadFunction<any>,
	reset_password?: FieldPolicy<any> | FieldReadFunction<any>,
	unblock_user?: FieldPolicy<any> | FieldReadFunction<any>,
	up_vote_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	update_application?: FieldPolicy<any> | FieldReadFunction<any>,
	update_application_comment_rules?: FieldPolicy<any> | FieldReadFunction<any>,
	update_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	update_poll_vote?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationKeySpecifier = ('application_id' | 'created_at' | 'id' | 'message' | 'updated_at' | 'url' | NotificationKeySpecifier)[];
export type NotificationFieldPolicy = {
	application_id?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OptionEntityKeySpecifier = ('id' | 'option' | 'votes' | OptionEntityKeySpecifier)[];
export type OptionEntityFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	option?: FieldPolicy<any> | FieldReadFunction<any>,
	votes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PollEntityKeySpecifier = ('closed' | 'created_at' | 'id' | 'options' | 'title' | 'updated_at' | 'voted' | PollEntityKeySpecifier)[];
export type PollEntityFieldPolicy = {
	closed?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	options?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	voted?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProfileEntityKeySpecifier = ('id' | 'profile_comments' | 'user' | ProfileEntityKeySpecifier)[];
export type ProfileEntityFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	profile_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('current_user' | 'fetch_all_applications' | 'fetch_all_threads' | 'fetch_application_by_short_name' | 'fetch_applications_by_owner_id' | 'fetch_comment_and_vote_count' | 'fetch_comments' | 'fetch_comments_by_application_id' | 'fetch_comments_by_application_short_name' | 'fetch_comments_by_thread_id' | 'fetch_notifications' | 'fetch_notifications_by_application_id' | 'fetch_notifications_by_short_name' | 'fetch_notifications_by_user_id' | 'fetch_threads_by_user_id' | 'fetch_users' | 'find_one_application_by_id' | 'find_one_application_by_name' | 'find_one_thread_or_create_one' | 'find_profile' | 'find_thread_by_id' | 'resend_email_code' | 'search_user_by_email' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	current_user?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_all_applications?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_all_threads?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_application_by_short_name?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_applications_by_owner_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_comment_and_vote_count?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_comments_by_application_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_comments_by_application_short_name?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_comments_by_thread_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_notifications?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_notifications_by_application_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_notifications_by_short_name?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_notifications_by_user_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_threads_by_user_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_users?: FieldPolicy<any> | FieldReadFunction<any>,
	find_one_application_by_id?: FieldPolicy<any> | FieldReadFunction<any>,
	find_one_application_by_name?: FieldPolicy<any> | FieldReadFunction<any>,
	find_one_thread_or_create_one?: FieldPolicy<any> | FieldReadFunction<any>,
	find_profile?: FieldPolicy<any> | FieldReadFunction<any>,
	find_thread_by_id?: FieldPolicy<any> | FieldReadFunction<any>,
	resend_email_code?: FieldPolicy<any> | FieldReadFunction<any>,
	search_user_by_email?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RatingModelKeySpecifier = ('author_id' | 'id' | RatingModelKeySpecifier)[];
export type RatingModelFieldPolicy = {
	author_id?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ReportModelKeySpecifier = ('created_at' | 'id' | 'reason' | 'updated_at' | 'user_id' | ReportModelKeySpecifier)[];
export type ReportModelFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	reason?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StandardResponseKeySpecifier = ('message' | 'success' | StandardResponseKeySpecifier)[];
export type StandardResponseFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StandardResponseModelKeySpecifier = ('message' | 'success' | StandardResponseModelKeySpecifier)[];
export type StandardResponseModelFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ThreadModelKeySpecifier = ('application_id' | 'commenters_ids' | 'id' | 'parent_application' | 'pinned_comment' | 'pinned_comment_id' | 'poll' | 'thread_comments' | 'title' | 'website_url' | ThreadModelKeySpecifier)[];
export type ThreadModelFieldPolicy = {
	application_id?: FieldPolicy<any> | FieldReadFunction<any>,
	commenters_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	parent_application?: FieldPolicy<any> | FieldReadFunction<any>,
	pinned_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	pinned_comment_id?: FieldPolicy<any> | FieldReadFunction<any>,
	poll?: FieldPolicy<any> | FieldReadFunction<any>,
	thread_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	website_url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserModelKeySpecifier = ('applications_joined_ids' | 'avatar' | 'blocked_users' | 'confirmed' | 'created_at' | 'email' | 'id' | 'last_active' | 'status' | 'updated_at' | 'user_role' | 'username' | UserModelKeySpecifier)[];
export type UserModelFieldPolicy = {
	applications_joined_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	blocked_users?: FieldPolicy<any> | FieldReadFunction<any>,
	confirmed?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	last_active?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	user_role?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VoteEntityKeySpecifier = ('id' | 'user_id' | VoteEntityKeySpecifier)[];
export type VoteEntityFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	ApplicationModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ApplicationModelKeySpecifier | (() => undefined | ApplicationModelKeySpecifier),
		fields?: ApplicationModelFieldPolicy,
	},
	AvatarEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AvatarEntityKeySpecifier | (() => undefined | AvatarEntityKeySpecifier),
		fields?: AvatarEntityFieldPolicy,
	},
	CommentAndVoteCountEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommentAndVoteCountEntityKeySpecifier | (() => undefined | CommentAndVoteCountEntityKeySpecifier),
		fields?: CommentAndVoteCountEntityFieldPolicy,
	},
	CommentModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommentModelKeySpecifier | (() => undefined | CommentModelKeySpecifier),
		fields?: CommentModelFieldPolicy,
	},
	CountModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CountModelKeySpecifier | (() => undefined | CountModelKeySpecifier),
		fields?: CountModelFieldPolicy,
	},
	FetchAllComments?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FetchAllCommentsKeySpecifier | (() => undefined | FetchAllCommentsKeySpecifier),
		fields?: FetchAllCommentsFieldPolicy,
	},
	FetchCommentByApplicationName?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FetchCommentByApplicationNameKeySpecifier | (() => undefined | FetchCommentByApplicationNameKeySpecifier),
		fields?: FetchCommentByApplicationNameFieldPolicy,
	},
	FetchCommentByThreadIdResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FetchCommentByThreadIdResponseKeySpecifier | (() => undefined | FetchCommentByThreadIdResponseKeySpecifier),
		fields?: FetchCommentByThreadIdResponseFieldPolicy,
	},
	FetchCommentsByApplicationId?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FetchCommentsByApplicationIdKeySpecifier | (() => undefined | FetchCommentsByApplicationIdKeySpecifier),
		fields?: FetchCommentsByApplicationIdFieldPolicy,
	},
	LoginResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoginResponseKeySpecifier | (() => undefined | LoginResponseKeySpecifier),
		fields?: LoginResponseFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Notification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationKeySpecifier | (() => undefined | NotificationKeySpecifier),
		fields?: NotificationFieldPolicy,
	},
	OptionEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OptionEntityKeySpecifier | (() => undefined | OptionEntityKeySpecifier),
		fields?: OptionEntityFieldPolicy,
	},
	PollEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PollEntityKeySpecifier | (() => undefined | PollEntityKeySpecifier),
		fields?: PollEntityFieldPolicy,
	},
	ProfileEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProfileEntityKeySpecifier | (() => undefined | ProfileEntityKeySpecifier),
		fields?: ProfileEntityFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	RatingModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RatingModelKeySpecifier | (() => undefined | RatingModelKeySpecifier),
		fields?: RatingModelFieldPolicy,
	},
	ReportModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ReportModelKeySpecifier | (() => undefined | ReportModelKeySpecifier),
		fields?: ReportModelFieldPolicy,
	},
	StandardResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StandardResponseKeySpecifier | (() => undefined | StandardResponseKeySpecifier),
		fields?: StandardResponseFieldPolicy,
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
	},
	VoteEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VoteEntityKeySpecifier | (() => undefined | VoteEntityKeySpecifier),
		fields?: VoteEntityFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;