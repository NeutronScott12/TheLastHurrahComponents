import React, { useState } from 'react'

import {
    CommentModel,
    FindOneOrCreateOneThreadDocument,
    Maybe,
    useDeleteThreadCommentMutation,
} from '../../../generated/graphql'
import { clone, mergeDeepRight } from 'ramda'
import { CommentView } from '../views/CommentView'
import {
    findOneOrCreateOneThreadQueryCache,
    writeOneOrCreateOneThreadQueryCache,
} from '../common'

export interface IComment extends CommentModel {
    author: {
        username: string
        email: string
        id: string
        applications_joined_ids: string[]
        confirmed: boolean
        created_at: string
        updated_at: string
        user_role: string
    }
    id: string
    body: string
    created_at: string
    thread_id: string
    application_id: string
    parent_id: Maybe<string> | undefined
    replies: CommentModel[]
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
    const [checkError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [deleteCommentMutation] = useDeleteThreadCommentMutation()

    const deleteComment = async (id: string) => {
        try {
            await deleteCommentMutation({
                variables: { commentId: id },
                update(cache) {
                    const response = findOneOrCreateOneThreadQueryCache({
                        application_id,
                        title,
                        website_url,
                        limit,
                        skip,
                    })

                    if (response && response.find_one_thread_or_create_one) {
                        const cloned = clone(response)
                        const filteredList =
                            cloned.find_one_thread_or_create_one.thread_comments.comments.filter(
                                (data) => data.id !== id,
                            )

                        const newData = mergeDeepRight(cloned, {
                            find_one_thread_or_create_one: {
                                thread_comments: {
                                    __typename:
                                        'FetchCommentByThreadIdResponse',
                                    comments_count:
                                        cloned.find_one_thread_or_create_one
                                            .thread_comments.comments_count,
                                    comments: [...filteredList],
                                },
                            },
                        })

                        writeOneOrCreateOneThreadQueryCache({
                            application_id,
                            title,
                            website_url,
                            limit,
                            skip,
                            data: newData,
                        })
                    }
                },
            })
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
                setError(true)
                setErrorMessage('something went wrong')
            }
        }
    }

    const deleteReplyComment = async (
        id: string,
        parent_id: Maybe<string> | undefined,
    ) => {
        try {
            await deleteCommentMutation({
                variables: {
                    commentId: id,
                },
                refetchQueries: [
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
                ],

                // update(cache) {
                //     const response = findOneOrCreateOneThreadQueryCache({
                //         application_id,
                //         title,
                //         website_url,
                //         limit,
                //         skip,
                //     })

                //     console.log('RESPONSE', response)
                //     console.log('PARENT_ID', parent_id)

                //     if (
                //         response &&
                //         response.find_one_thread_or_create_one &&
                //         parent_id
                //     ) {
                //         const cloned = clone(response)
                //         console.log('CLONED', cloned)

                //         const augmetedList =
                //             cloned.find_one_thread_or_create_one.thread_comments.comments.find(
                //                 (comment) => comment.id === parent_id,
                //             )

                //         if (augmetedList?.replies) {
                //             remove(
                //                 augmetedList.replies,
                //                 (comment) => comment.id === id,
                //             )

                //             const index =
                //                 cloned.find_one_thread_or_create_one.thread_comments.comments.findIndex(
                //                     (comment) => comment.id === id,
                //                 )

                //             const newComments =
                //                 cloned.find_one_thread_or_create_one.thread_comments.comments.splice(
                //                     index,
                //                     1,
                //                     augmetedList,
                //                 )

                //             console.log('NEW_COMMENTS', newComments)

                //             const newData = mergeDeepRight(cloned, {
                //                 find_one_thread_or_create_one: {
                //                     thread_comments: {
                //                         __typename:
                //                             'FetchCommentByThreadIdResponse',
                //                         comments_count:
                //                             cloned.find_one_thread_or_create_one
                //                                 .thread_comments.comments_count,
                //                         comments: newComments,
                //                     },
                //                 },
                //             })

                //             writeOneOrCreateOneThreadQueryCache({
                //                 application_id,
                //                 title,
                //                 website_url,
                //                 limit,
                //                 skip,
                //                 data: newData,
                //             })
                //         }
                //     }
                // },
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <CommentView
            title={title}
            website_url={website_url}
            limit={limit}
            skip={skip}
            comment={comment}
            deleteComment={deleteComment}
            deleteReplyComment={deleteReplyComment}
        />
    )
}
