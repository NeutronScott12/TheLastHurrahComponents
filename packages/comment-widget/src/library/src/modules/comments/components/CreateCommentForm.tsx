import React, { useState } from 'react'
import { useFormik } from 'formik'
import { clone, mergeDeepRight } from 'ramda'

import { Sort, useCreateThreadComentMutation } from '../../../generated/graphql'
import { Button, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import {
    commentValidationSchema,
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../common'

interface ICreateCommentProps {
    thread_id: string
    application_id: string
    skip: number
    limit: number
    currentSort: Sort
}

export const CreateCommentForm: React.FC<ICreateCommentProps> = ({
    thread_id,
    application_id,
    skip,
    limit,
    currentSort,
}) => {
    const [checkError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [createComment] = useCreateThreadComentMutation()
    const formik = useFormik({
        initialValues: {
            body: '',
        },
        validationSchema: commentValidationSchema,
        async onSubmit({ body }, { resetForm, setSubmitting }) {
            try {
                await createComment({
                    variables: {
                        createCommentInput: {
                            application_id,
                            body,
                            thread_id,
                        },
                    },
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
                            data.create_comment
                        ) {
                            const cloneData = clone(response)
                            const newData = {
                                fetch_comments_by_thread_id: {
                                    __typename:
                                        response.fetch_comments_by_thread_id
                                            .__typename,
                                    comments_count:
                                        cloneData.fetch_comments_by_thread_id
                                            .comments_count,
                                    comments: [
                                        data.create_comment,
                                        ...cloneData.fetch_comments_by_thread_id
                                            .comments,
                                    ],
                                },
                            }

                            const changedObject = mergeDeepRight(
                                cloneData,
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

                resetForm()
                setSubmitting(false)
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
            {/* {checkSuccess ? (
                <Alert severity="error">{successMessage}</Alert>
            ) : (
                ''
            )} */}
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
