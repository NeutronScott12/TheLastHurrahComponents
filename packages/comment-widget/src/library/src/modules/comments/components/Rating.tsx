import React from 'react'
import { Comment } from 'semantic-ui-react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import { IComment } from './Comment'
import {
    useDownVoteCommentMutation,
    useUpVoteCommentMutation,
} from '../../../generated/graphql'

interface IRatings {
    comment: IComment
}

export const Ratings: React.FC<IRatings> = ({ comment }) => {
    const [upVoteComment] = useUpVoteCommentMutation()
    const [downVoteComment] = useDownVoteCommentMutation()

    const upVote = async () => {
        try {
            await upVoteComment({ variables: { comment_id: comment.id } })
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
            }
        }
    }

    const downVote = async () => {
        try {
            await downVoteComment({ variables: { comment_id: comment.id } })
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <Comment.Action onClick={upVote}>
                <ArrowUpwardIcon /> {comment._count.up_vote}
            </Comment.Action>
            <Comment.Action onClick={downVote}>
                <ArrowDownwardIcon /> {comment._count.down_vote}
            </Comment.Action>
        </>
    )
}
