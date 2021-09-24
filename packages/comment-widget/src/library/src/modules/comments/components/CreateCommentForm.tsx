import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { clone } from 'ramda'

import {
    FetchCommentByThreadIdDocument,
    FindOneOrCreateOneThreadDocument,
    FindOneOrCreateOneThreadQuery,
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
    title: string
    website_url: string
}

const validationSchema = yup.object().shape({
    body: yup.string().required(),
})

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
                            cache.readQuery<FindOneOrCreateOneThreadQuery>({
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
