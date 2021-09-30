import { Button, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useFormik } from 'formik'
import {
    clone,
    mergeDeepRight,
    findIndex,
    propEq,
    curry,
    map,
    when,
    evolve,
    always,
    remove,
    insert,
    update,
} from 'ramda'
import React, { useState } from 'react'
import { Sort, useEditThreadCommentMutation } from '../../../generated/graphql'
import {
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../common'

interface IEditCommentForm {
    changeUseEdit: React.Dispatch<React.SetStateAction<boolean>>
    changeUseReplyEdit?: React.Dispatch<React.SetStateAction<boolean>>
    comment_body: string
    thread_id: string
    comment_id: string
    application_id: string
    title: string
    website_url: string
    limit: number
    skip: number
    currentSort: Sort
}

export const EditCommentForm: React.FC<IEditCommentForm> = ({
    changeUseEdit,
    changeUseReplyEdit,
    thread_id,
    comment_body,
    comment_id,
    limit,
    skip,
    currentSort,
}) => {
    const [checkError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [editComment] = useEditThreadCommentMutation()
    const formik = useFormik({
        initialValues: {
            body: comment_body,
        },
        async onSubmit({ body }) {
            try {
                if (body === comment_body) {
                    changeUseEdit(false)
                    if (changeUseReplyEdit) {
                        changeUseReplyEdit(false)
                    }
                } else {
                    await editComment({
                        variables: { UpdateCommentInput: { body, comment_id } },
                        update(cache, { data }) {
                            const response = fetchCommentByThreadIdQueryCache({
                                thread_id,
                                limit,
                                skip,
                                sort: currentSort,
                            })

                            if (
                                response &&
                                response.fetch_comments_by_thread_id &&
                                data &&
                                data.update_comment
                            ) {
                                let clonedData = clone(response)
                                let comments =
                                    clonedData.fetch_comments_by_thread_id
                                        .comments
                                let newComments

                                if (!data.update_comment.parent_id) {
                                    const index = findIndex(
                                        propEq('id', data.update_comment.id),
                                    )(comments)

                                    newComments = update(
                                        index,
                                        data.update_comment,
                                        comments,
                                    )
                                } else {
                                    console.log('SHOULD NOT BE RUNNING')
                                    const replies = comments.find(
                                        (comment) =>
                                            comment.id ===
                                            data.update_comment.parent_id,
                                    )?.replies

                                    if (replies) {
                                        const replyIndex = replies.findIndex(
                                            (comment) =>
                                                comment.id ===
                                                data.update_comment.id,
                                        )

                                        const filtered_reply = remove(
                                            replyIndex,
                                            1,
                                            replies,
                                        )

                                        const newReplies = insert(
                                            replyIndex,
                                            data.update_comment,
                                            filtered_reply,
                                        )

                                        const fn = curry((id, prop, content) =>
                                            map(
                                                when(
                                                    propEq('id', id),
                                                    evolve({
                                                        [prop]: always(content),
                                                    }),
                                                ),
                                            ),
                                        )

                                        newComments = Array.from(
                                            fn(
                                                data.update_comment.parent_id,
                                                'replies',
                                                newReplies,
                                            )(comments),
                                        )
                                    }
                                }

                                const newData = {
                                    fetch_comments_by_thread_id: {
                                        __typename:
                                            response.fetch_comments_by_thread_id
                                                .__typename,
                                        comments_count:
                                            clonedData
                                                .fetch_comments_by_thread_id
                                                .comments_count,
                                        comments: newComments,
                                    },
                                }

                                const changedObject = mergeDeepRight(
                                    clonedData,
                                    newData,
                                )

                                WriteCommentByThreadIdQueryArgs({
                                    thread_id,
                                    limit,
                                    skip,
                                    sort: currentSort,
                                    data: changedObject,
                                })
                            }
                        },
                    })

                    changeUseEdit(false)
                    if (changeUseReplyEdit) {
                        changeUseReplyEdit(false)
                    }
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error)
                    setError(true)
                    setErrorMessage('something went wrong')
                }
            }
        },
    })

    return (
        <div>
            {checkError ? <Alert severity="error">{errorMessage}</Alert> : ''}
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="body"
                    name="body"
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    error={formik.touched.body && Boolean(formik.errors.body)}
                    helperText={formik.touched.body && formik.errors.body}
                />
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </div>
    )
}
