import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Button, TextField } from '@material-ui/core'
import { useCreateReplyCommentMutation } from '../../../generated/graphql'
import {
    commentValidationSchema,
    findOneOrCreateOneThreadQueryCache,
    writeOneOrCreateOneThreadQueryCache,
} from '../common'

import { IComment } from './Comment'
import { Alert } from '@material-ui/lab'
import { clone } from 'ramda'

interface IReplyCommentFormProps {
    parent_id: string
    replied_to_id: string
    changeUseMain: React.Dispatch<React.SetStateAction<boolean>>
    comment: IComment
    limit: number
    skip: number
    website_url: string
    title: string
}

export const ReplyCommentForm: React.FC<IReplyCommentFormProps> = ({
    parent_id,
    replied_to_id,
    comment,
    limit,
    skip,
    website_url,
    title,
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
                        const response = findOneOrCreateOneThreadQueryCache({
                            application_id: comment.application_id,
                            title,
                            website_url,
                            limit,
                            skip,
                        })

                        changeUseMain(false)

                        if (data && response?.find_one_thread_or_create_one) {
                            const cloned = clone(response)

                            const parent_list =
                                cloned.find_one_thread_or_create_one.thread_comments.comments.find(
                                    (comment) => comment.id === parent_id,
                                )

                            if (parent_list?.replies) {
                                parent_list.replies.push(
                                    data.create_reply_comment,
                                )

                                writeOneOrCreateOneThreadQueryCache({
                                    application_id: comment.application_id,
                                    title,
                                    website_url,
                                    limit,
                                    skip,
                                    data: cloned,
                                })
                            }
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
