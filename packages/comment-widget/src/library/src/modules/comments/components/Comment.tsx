import React, { useState } from 'react'
import {
    always,
    clone,
    curry,
    evolve,
    findIndex,
    map,
    mergeDeepRight,
    propEq,
    when,
} from 'ramda'

import {
    CountModel,
    Maybe,
    Sort,
    useAddPinnedCommentMutation,
    useCurrentUserQuery,
    useDeleteThreadCommentMutation,
    useFindOneApplicationByIdQuery,
    useFindThreadByIdQuery,
} from '../../../generated/graphql'
import { CommentView } from '../views/CommentView'
import {
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../common'
import { Loader } from '../common/Loader'
import { Descendant } from 'slate'
import { Alert } from '@mui/material'

export interface IComment {
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
    pending: boolean
    approved: boolean
    reply_notification: boolean
    parent_id?: Maybe<string> | undefined
    replied_to_user?: Maybe<{
        __typename?: 'UserModel' | undefined
        username: string
    }>
    replies?: IComment[]
    _count: CountModel
}

interface ICommentProps {
    comment: IComment
    thread_id: string
    skip: number
    limit: number
    title: string
    website_url: string
    application_id: string
    application_short_name: string
    currentSort: Sort
    pendingReplies: IComment[]
    setPendingReplies: React.Dispatch<React.SetStateAction<IComment[]>>
}

export const CommentComponent: React.FC<ICommentProps> = ({
    thread_id,
    comment,
    skip,
    limit,
    title,
    website_url,
    application_id,
    application_short_name,
    currentSort,
    pendingReplies,
    setPendingReplies,
}) => {
    const [checkError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { refetch } = useFindThreadByIdQuery({
        variables: { findThreadById: { thread_id } },
    })
    const [deleteCommentMutation] = useDeleteThreadCommentMutation()
    const [addPinnedCommentMutation] = useAddPinnedCommentMutation()
    const { data: applicationData, loading: applicationLoading } =
        useFindOneApplicationByIdQuery({
            variables: { id: application_id },
        })

    const { data, loading } = useCurrentUserQuery()

    const deleteComment = async (id: string) => {
        try {
            await deleteCommentMutation({
                variables: { commentId: id },
                update(cache) {
                    const response = fetchCommentByThreadIdQueryCache({
                        thread_id,
                        limit,
                        skip,
                        sort: currentSort,
                        application_short_name,
                    })

                    if (response && response.fetch_comments_by_thread_id) {
                        const cloned = clone(response)
                        const filteredList =
                            cloned.fetch_comments_by_thread_id.comments.filter(
                                (data) => data.id !== id,
                            )

                        const newData = mergeDeepRight(cloned, {
                            fetch_comments_by_thread_id: {
                                __typename:
                                    cloned.fetch_comments_by_thread_id
                                        .__typename,
                                comments_count:
                                    cloned.fetch_comments_by_thread_id
                                        .comments_count,
                                comments: [...filteredList],
                            },
                        })

                        WriteCommentByThreadIdQueryArgs({
                            thread_id,
                            limit,
                            skip,
                            sort: currentSort,
                            application_short_name,
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

                update(cache) {
                    const response = fetchCommentByThreadIdQueryCache({
                        thread_id,
                        limit,
                        skip,
                        application_short_name,
                        sort: currentSort,
                    })

                    console.log('RESPONSE', response)
                    console.log('PARENT_ID', parent_id)

                    if (
                        response &&
                        response.fetch_comments_by_thread_id &&
                        parent_id
                    ) {
                        const cloned = clone(response)
                        let comments =
                            cloned.fetch_comments_by_thread_id.comments
                        let newComments

                        if (comments) {
                            const parent_index = findIndex(
                                (comment) => comment.id === parent_id,
                                comments,
                            )

                            console.log('PARENT_INDEX', parent_index)

                            let newReplies = comments[
                                parent_index
                            ].replies.filter((comment) => {
                                console.log('COMMENT', comment)
                                return comment.id !== id
                            })

                            console.log('NEW_REPLIES', newReplies)

                            const fn = curry((id, prop, content) =>
                                map(
                                    when(
                                        propEq('id', id),
                                        evolve({ [prop]: always(content) }),
                                    ),
                                ),
                            )

                            newComments = Array.from(
                                fn(parent_id, 'replies', newReplies)(comments),
                            )
                            // comments[parent_index].replies = newReplies
                        }

                        console.log('NEW_COMMENTS', newComments)

                        const newData = mergeDeepRight(cloned, {
                            fetch_comments_by_thread_id: {
                                __typename:
                                    response.fetch_comments_by_thread_id
                                        .__typename,
                                comments_count:
                                    cloned.fetch_comments_by_thread_id
                                        .comments_count,

                                comments: newComments,
                            },
                        })

                        cache.evict({
                            fieldName: 'CommentModel',
                            broadcast: false,
                        })

                        WriteCommentByThreadIdQueryArgs({
                            thread_id,
                            limit,
                            skip,
                            sort: currentSort,
                            application_short_name,
                            data: newData,
                        })
                    }
                },
            })
        } catch (error) {
            console.error(error)
        }
    }

    const addPendingReplyComments = (
        replies: IComment[],
        parent_id: string,
    ) => {
        try {
            const response = fetchCommentByThreadIdQueryCache({
                thread_id: comment.thread_id,
                limit,
                skip,
                sort: currentSort,
                application_short_name,
            })

            console.log('RESPONSE', response)
            console.log('DATA', replies)
            console.log('PARENT_ID', parent_id)

            if (data && response?.fetch_comments_by_thread_id) {
                const cloned = clone(response)
                replies.forEach(
                    //@ts-ignore
                    (comment) => (comment['__typename'] = 'CommentModel'),
                )

                if (cloned.fetch_comments_by_thread_id.comments) {
                    //@ts-ignore
                    cloned.fetch_comments_by_thread_id.comments
                        .find((comment) => comment.id === parent_id)
                        //@ts-ignore
                        .replies.push(...replies)
                }

                console.log('CLONED', cloned)

                const newData = mergeDeepRight(cloned, {
                    fetch_comments_by_thread_id: {
                        __typename:
                            response.fetch_comments_by_thread_id.__typename,
                        comments_count:
                            cloned.fetch_comments_by_thread_id.comments_count,
                        comments: cloned.fetch_comments_by_thread_id.comments,
                    },
                })

                const newReplies = pendingReplies.filter(
                    (reply) => reply.id === parent_id,
                )
                console.log('NEW_REPLIES', newReplies)
                setPendingReplies(newReplies)

                WriteCommentByThreadIdQueryArgs({
                    thread_id: comment.thread_id,
                    limit,
                    skip,
                    sort: currentSort,
                    application_short_name,
                    data: newData,
                })
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
                setError(true)
                setErrorMessage('something went wrong')
            }
        }
    }

    const addPinnedComment = async (comment_id: string) => {
        try {
            await addPinnedCommentMutation({
                variables: {
                    addPinnedCommentInput: {
                        thread_id,
                        comment_id,
                    },
                },
            })
            await refetch()
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
                setError(true)
                setErrorMessage('something went wrong')
            }
        }
    }

    return loading && applicationLoading ? (
        <Loader />
    ) : (
        <>
            {checkError ? <Alert severity="error">{errorMessage}</Alert> : ''}
            <CommentView
                addPendingReplyComments={addPendingReplyComments}
                pendingReplies={pendingReplies}
                setPendingReplies={setPendingReplies}
                application_short_name={application_short_name}
                currentSort={currentSort}
                currentUser={data && data.current_user ? data : undefined}
                moderators={
                    applicationData &&
                    applicationData?.find_one_application_by_id.moderators
                }
                thread_id={thread_id}
                title={title}
                website_url={website_url}
                limit={limit}
                skip={skip}
                comment={comment}
                deleteComment={deleteComment}
                deleteReplyComment={deleteReplyComment}
                addPinnedComment={addPinnedComment}
            />
        </>
    )
}
