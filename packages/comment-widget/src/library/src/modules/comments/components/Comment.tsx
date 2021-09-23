import React from 'react'
import { Comment } from 'semantic-ui-react'
import Moment from 'react-moment'
import {
    FetchCommentByThreadIdDocument,
    FetchCommentByThreadIdQuery,
    useDeleteThreadCommentMutation,
} from '../../../generated/graphql'
import { clone } from 'ramda'

interface IComment {
    author: {
        username: string
    }
    id: string
    body: string
    created_at: string
    thread_id: string
    replies?: IComment[]
}

interface ICommentProps {
    comment: IComment
    skip: number
    limit: number
}

export const CommentComponent: React.FC<ICommentProps> = ({
    comment,
    skip,
    limit,
}) => {
    const [deleteCommentMutation] = useDeleteThreadCommentMutation()

    const deleteComment = async () => {
        await deleteCommentMutation({
            variables: { commentId: comment.id },
            update(cache) {
                const response = cache.readQuery<FetchCommentByThreadIdQuery>({
                    query: FetchCommentByThreadIdDocument,
                    variables: {
                        fetchCommentByThreadIdInput: {
                            thread_id: comment.thread_id,
                            skip,
                            limit,
                        },
                    },
                })

                if (response && response.fetch_comments_by_thread_id) {
                    const cloned = clone(response)
                    const filteredList =
                        cloned.fetch_comments_by_thread_id.comments.filter(
                            (data) => data.id !== comment.id,
                        )

                    const newData = Object.assign(cloned, {
                        __typename: 'FetchCommentByThreadIdResponse',
                        fetch_comments_by_thread_id: {
                            comments_count:
                                cloned.fetch_comments_by_thread_id
                                    .comments_count,
                            comments: [...filteredList],
                        },
                    })

                    cache.writeQuery({
                        query: FetchCommentByThreadIdDocument,
                        variables: {
                            fetchCommentByThreadIdInput: {
                                thread_id: comment.thread_id,
                                skip,
                                limit,
                            },
                        },
                        data: newData,
                    })
                }
            },
        })
    }

    return (
        <Comment>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
            <Comment.Content>
                <Comment.Author as="a">
                    {comment.author.username}
                </Comment.Author>
                <Comment.Metadata>
                    <Moment format="DD/MM/YYYY">{comment.created_at}</Moment>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
                <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                    <Comment.Action onClick={deleteComment}>
                        delete
                    </Comment.Action>
                </Comment.Actions>
            </Comment.Content>
            <Comment.Group>
                <Comment>
                    {comment.replies
                        ? comment.replies.map((reply) => (
                              <>
                                  <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
                                  <Comment.Content>
                                      <Comment.Author as="a">
                                          {reply.author.username}
                                      </Comment.Author>
                                      <Comment.Metadata>
                                          <Moment>{reply.created_at}</Moment>
                                      </Comment.Metadata>
                                      <Comment.Text>{reply.body}</Comment.Text>
                                      <Comment.Actions>
                                          <Comment.Action>Reply</Comment.Action>
                                      </Comment.Actions>
                                  </Comment.Content>
                              </>
                          ))
                        : ''}
                </Comment>
            </Comment.Group>
        </Comment>
    )
}
