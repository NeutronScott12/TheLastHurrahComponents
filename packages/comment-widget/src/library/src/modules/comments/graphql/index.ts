import { gql } from '@apollo/client'
import { IComment } from '../components/Comment'

export interface ICommentAddedSubscriptionVariables {
    thread_id: string
}

export interface ICommentAddedSubscriptionResponse {
    comment_added: IComment
}

const COMMENT_FRAGMENT = gql`
    fragment CommentFragment2 on CommentEntity {
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
        approved
        _count {
            down_vote
            replies
            up_vote
        }
        replied_to_user {
            username
        }
    }
`

// ($commentAddedInput: {thread_id: String!})

export const COMMENT_ADDED_SUBSCRIPTION = gql`
    subscription CommentAdded($thread_id: String!) {
        comment_added(thread_id: $thread_id) {
            ...CommentFragment2
            replies {
                ...CommentFragment2
            }
        }
    }
    ${COMMENT_FRAGMENT}
`
