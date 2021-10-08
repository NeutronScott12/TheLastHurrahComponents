import React, { useState } from 'react'
import { useFormik } from 'formik'
import { clone, mergeDeepRight } from 'ramda'
import { Descendant } from 'slate'
import { Button as MUIButton } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { Sort, useCreateThreadComentMutation } from '../../../generated/graphql'
import {
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../common'

import { RichTextEditorView } from '../views/RichTextEditorView'

interface ICreateCommentProps {
    thread_id: string
    application_id: string
    skip: number
    limit: number
    currentSort: Sort
}

const initialValue: Descendant[] = [
    {
        //@ts-ignore
        type: 'paragraph',
        children: [{ text: '' }],
    },
]

export const CreateCommentForm: React.FC<ICreateCommentProps> = ({
    thread_id,
    application_id,
    skip,
    limit,
    currentSort,
}) => {
    const [checkError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [value, setValue] = useState<Descendant[]>(initialValue)

    const [createComment] = useCreateThreadComentMutation()
    const formik = useFormik({
        initialValues: {
            body: '',
        },
        // validationSchema: commentValidationSchema,
        async onSubmit({ body }, { resetForm, setSubmitting }) {
            try {
                console.log('VALUE', value)

                await createComment({
                    variables: {
                        createCommentInput: {
                            application_id,
                            plain_text_body: body,
                            json_body: value,
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

                setValue(initialValue)
                resetForm()
                setSubmitting(false)
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error)
                    setError(true)
                    setErrorMessage(error.message)
                }
            }
        },
    })

    // formik.handleSubmit

    return (
        <div>
            {checkError ? (
                <Alert style={{ fontSize: '1.2rem' }} severity="error">
                    {errorMessage}
                    <MUIButton onClick={() => setError(false)}>
                        remove
                    </MUIButton>
                </Alert>
            ) : (
                ''
            )}
            {/* {checkSuccess ? (
                <Alert severity="error">{successMessage}</Alert>
            ) : (
                ''
            )} */}
            <form onSubmit={formik.handleSubmit}>
                <RichTextEditorView
                    setFieldValue={formik.setFieldValue}
                    value={value}
                    setValue={setValue}
                />
            </form>
        </div>
    )
}
