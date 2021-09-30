import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Button, TextField } from '@material-ui/core'
import { useCreateReplyCommentMutation } from '../../../generated/graphql'
import {
    commentValidationSchema,
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../common'

import { IComment } from './Comment'
import { Alert } from '@material-ui/lab'
import { clone, mergeDeepRight } from 'ramda'

interface IReplyCommentFormProps {
    changeUseMain: React.Dispatch<React.SetStateAction<boolean>>
    parent_id: string
    replied_to_id: string
    comment: IComment
    limit: number
    skip: number
}

export const ReplyCommentForm: React.FC<IReplyCommentFormProps> = ({
    parent_id,
    replied_to_id,
    comment,
    limit,
    skip,
    changeUseMain,
}) => {
    const [checkError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [createReply] = useCreateReplyCommentMutation()

    const formik = useFormik({
        initialValues: {
            body: '',
        },
        validationSchema: commentValidationSchema,
        async onSubmit({ body }) {
            try {
                await createReply({
                    variables: {
                        CreateReplyCommentInput: {
                            body,
                            application_id: comment.application_id,
                            thread_id: comment.thread_id,
                            parent_id,
                            replied_to_id,
                        },
                    },
                    update(cache, { data }) {
                        const response = fetchCommentByThreadIdQueryCache({
                            thread_id: comment.thread_id,
                            limit,
                            skip,
                        })

                        changeUseMain(false)

                        if (data && response?.fetch_comments_by_thread_id) {
                            const cloned = clone(response)

                            if (cloned.fetch_comments_by_thread_id.comments) {
                                //@ts-ignore
                                cloned.fetch_comments_by_thread_id.comments
                                    .find(
                                        (comment) =>
                                            comment.id ===
                                            data.create_reply_comment.parent_id,
                                    )
                                    .replies.push(data.create_reply_comment)
                            }

                            const newData = mergeDeepRight(cloned, {
                                fetch_comments_by_thread_id: {
                                    __typename:
                                        response.fetch_comments_by_thread_id
                                            .__typename,
                                    comments_count:
                                        cloned.fetch_comments_by_thread_id
                                            .comments_count,
                                    comments:
                                        cloned.fetch_comments_by_thread_id
                                            .comments,
                                },
                            })

                            WriteCommentByThreadIdQueryArgs({
                                thread_id: comment.thread_id,
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
                    label="Leave a comment"
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
