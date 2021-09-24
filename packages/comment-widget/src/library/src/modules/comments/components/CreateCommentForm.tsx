import React, { useState } from 'react'
import { useFormik } from 'formik'
import { clone } from 'ramda'

import { useCreateThreadComentMutation } from '../../../generated/graphql'
import { Button, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { mergeDeep } from '@apollo/client/utilities'
import {
    commentValidationSchema,
    findOneOrCreateOneThreadQueryCache,
    writeOneOrCreateOneThreadQueryCache,
} from '../common'

interface ICreateCommentProps {
    thread_id: string
    application_id: string
    skip: number
    limit: number
    title: string
    website_url: string
}

export const CreateCommentForm: React.FC<ICreateCommentProps> = ({
    thread_id,
    application_id,
    skip,
    limit,
    title,
    website_url,
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
                        const response = findOneOrCreateOneThreadQueryCache({
                            application_id,
                            title,
                            website_url,
                            limit,
                            skip,
                        })

                        if (
                            response &&
                            response.find_one_thread_or_create_one &&
                            data &&
                            data.create_comment
                        ) {
                            const cloneData = clone(response)
                            const newData = {
                                find_one_thread_or_create_one: {
                                    thread_comments: {
                                        __typename:
                                            'FetchCommentByThreadIdResponse',
                                        comments_count:
                                            cloneData
                                                .find_one_thread_or_create_one
                                                .thread_comments.comments_count,
                                        comments: [
                                            data.create_comment,
                                            ...cloneData
                                                .find_one_thread_or_create_one
                                                .thread_comments.comments,
                                        ],
                                    },
                                },
                            }

                            const changedObject = mergeDeep(cloneData, newData)

                            writeOneOrCreateOneThreadQueryCache({
                                application_id,
                                title,
                                website_url,
                                limit,
                                skip,
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
