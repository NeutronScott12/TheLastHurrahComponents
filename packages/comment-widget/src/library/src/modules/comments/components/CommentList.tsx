import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { Comment } from 'semantic-ui-react'

import { useFetchCommentByThreadIdQuery } from '../../../generated/graphql'
import { CommentComponent } from './Comment'
import { CreateCommentForm } from './CreateCommentForm'

interface ICommentListProps {
    thread_id: string
    application_id: string
    logged_in: boolean
}

export const CommentList: React.FC<ICommentListProps> = ({
    thread_id,
    application_id,
    logged_in,
}) => {
    const [limit, changeLimit] = useState(10)
    const [skip] = useState(0)
    const { loading, data, fetchMore } = useFetchCommentByThreadIdQuery({
        variables: {
            fetchCommentByThreadIdInput: { thread_id, skip, limit },
        },
    })

    const fetchMoreComments = async () => {
        changeLimit(limit + 10)

        await fetchMore({
            variables: {
                fetchCommentByThreadIdInput: { thread_id, skip, limit },
            },
        })
    }

    console.log('DATA', data)

    return loading ? (
        <div>Loading...</div>
    ) : (
        <div>
            {logged_in ? (
                <CreateCommentForm
                    application_id={application_id}
                    thread_id={thread_id}
                    limit={limit}
                    skip={skip}
                />
            ) : (
                ''
            )}

            <Comment.Group size="huge">
                {data &&
                    data.fetch_comments_by_thread_id.comments.map((comment) => {
                        return (
                            <CommentComponent
                                limit={limit}
                                skip={skip}
                                key={comment.id}
                                comment={comment}
                            />
                        )
                    })}
            </Comment.Group>
            {data && data.fetch_comments_by_thread_id.comments_count > limit ? (
                <Button onClick={fetchMoreComments}>Click More</Button>
            ) : (
                ''
            )}
        </div>
    )
}
