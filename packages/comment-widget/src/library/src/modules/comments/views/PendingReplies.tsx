import { Button } from '@mui/material'
import React from 'react'
import { IComment } from '../components/Comment'

interface IPendingRepliesView {
    pendingReplies: IComment[]
    comment: IComment
    addPendingReplyComments: (replies: IComment[], parent_id: string) => void
}

export const PendingRepliesView: React.FC<IPendingRepliesView> = ({
    pendingReplies,
    comment,
    addPendingReplyComments,
}) => {
    const addPendingReplies = () => {
        const replies = pendingReplies.filter(
            (replies) => replies.parent_id === comment.id,
        )

        addPendingReplyComments(replies, comment.id)
    }

    return (
        <Button onClick={addPendingReplies}>
            Show comments{' '}
            {
                pendingReplies.filter(
                    (replies) => replies.parent_id === comment.id,
                ).length
            }
        </Button>
    )
}
