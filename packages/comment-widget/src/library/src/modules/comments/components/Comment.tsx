import React from 'react'
import { Comment } from 'semantic-ui-react'
import Moment from 'react-moment'
import {
    FindOneOrCreateOneThreadDocument,
    FindOneOrCreateOneThreadQuery,
    useDeleteThreadCommentMutation,
} from '../../../generated/graphql'
import { clone, mergeDeepRight } from 'ramda'

export interface IComment {
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
    title: string
    website_url: string
    application_id: string
}

export const CommentComponent: React.FC<ICommentProps> = ({
    comment,
    skip,
    limit,
    title,
    website_url,
    application_id,
}) => {
    const [deleteCommentMutation] = useDeleteThreadCommentMutation()

    const deleteComment = async () => {
        await deleteCommentMutation({
            variables: { commentId: comment.id },
            update(cache) {
                const response = cache.readQuery<FindOneOrCreateOneThreadQuery>(
                    {
                        query: FindOneOrCreateOneThreadDocument,
                        variables: {
                            findOrCreateOneThreadInput: {
                                application_id,
                                title,
                                website_url,
                            },
                            FetchThreadCommentsById: {
                                limit,
                                skip,
                            },
                        },
                    },
                )

                if (response && response.find_one_thread_or_create_one) {
                    const cloned = clone(response)
                    const filteredList =
                        cloned.find_one_thread_or_create_one.thread_comments.comments.filter(
                            (data) => data.id !== comment.id,
                        )

                    const newData = mergeDeepRight(cloned, {
                        find_one_thread_or_create_one: {
                            thread_comments: {
                                __typename: 'FetchCommentByThreadIdResponse',
                                comments_count:
                                    cloned.find_one_thread_or_create_one
                                        .thread_comments.comments_count,
                                comments: [...filteredList],
                            },
                        },
                    })

                    cache.writeQuery({
                        query: FindOneOrCreateOneThreadDocument,
                        variables: {
                            findOrCreateOneThreadInput: {
                                application_id,
                                title,
                                website_url,
                            },
                            FetchThreadCommentsById: {
                                limit,
                                skip,
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
