import { Descendant } from 'slate'
import { Maybe, OptionEntity, Scalars } from '../../../generated/graphql'

export interface IPinnedComment {
    author: {
        username: string
        id: string
    }
    id: string
    plain_text_body: string
    json_body: Descendant[]
    created_at: string
    thread_id: string
    application_id: string
    parent_id?: Maybe<string> | undefined
    replied_to_user?: Maybe<{
        __typename?: 'UserModel' | undefined
        username: string
    }>
}

export interface IModerator {
    username: string
    id: string
}

export interface IPollEntity {
    __typename?: 'PollEntity'
    created_at: Scalars['DateTime']
    id: Scalars['String']
    closed: boolean
    voted: string[]
    options: Array<OptionEntity>
    title: Scalars['String']
}
