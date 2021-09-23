import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { clone } from 'ramda'

import {
    FetchCommentByThreadIdDocument,
    FetchCommentByThreadIdQuery,
    useCreateThreadComentMutation,
} from '../../../generated/graphql'
import { Button, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { mergeDeep } from '@apollo/client/utilities'

interface ICreateCommentProps {
    thread_id: string
    application_id: string
    skip: number
    limit: number
}

const validationSchema = yup.object().shape({
    body: yup.string().required(),
})

export const CreateCommentForm: React.FC<ICreateCommentProps> = ({
    thread_id,
    application_id,
    skip,
    limit,
}) => {
    const [checkError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [createComment] = useCreateThreadComentMutation()
    const formik = useFormik({
        initialValues: {
            body: '',
        },
        validationSchema,
        async onSubmit({ body }) {
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
                        const response =
                            cache.readQuery<FetchCommentByThreadIdQuery>({
                                query: FetchCommentByThreadIdDocument,
                                variables: {
                                    fetchCommentByThreadIdInput: {
                                        thread_id,
                                        skip,
                                        limit,
                                    },
                                },
                            })

                        if (
                            response &&
                            response.fetch_comments_by_thread_id &&
                            data &&
                            data.create_comment
                        ) {
                            const cloneData = clone(response)
                            const newData = {
                                __typename: 'FetchCommentByThreadIdResponse',
                                fetch_comments_by_thread_id: {
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

                            const changedObject = mergeDeep(cloneData, newData)

                            cache.writeQuery({
                                query: FetchCommentByThreadIdDocument,
                                variables: {
                                    fetchCommentByThreadIdInput: {
                                        thread_id,
                                        skip,
                                        limit,
                                    },
                                },
                                data: changedObject,
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
