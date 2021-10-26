import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Sort, useCreateReplyCommentMutation } from '../../../generated/graphql'
import {
    commentValidationSchema,
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../common'

import { IComment } from './Comment'
import { Alert } from '@mui/material'
import { clone, mergeDeepRight } from 'ramda'
import { Descendant } from 'slate'
import { RichTextEditorView } from '../views/RichTextEditorView'

interface IReplyCommentFormProps {
    parent_id: string
    replied_to_id: string
    comment: IComment
    limit: number
    skip: number
    currentSort: Sort
    application_short_name: string
    changeUseMain: React.Dispatch<React.SetStateAction<boolean>>
}

const initialValue: Descendant[] = [
    {
        //@ts-ignore
        type: 'paragraph',
        children: [{ text: '' }],
    },
]

export const ReplyCommentForm: React.FC<IReplyCommentFormProps> = ({
    parent_id,
    replied_to_id,
    comment,
    limit,
    skip,
    currentSort,
    application_short_name,
    changeUseMain,
}) => {
    const [checkError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [createReply] = useCreateReplyCommentMutation()
    const [value, setValue] = useState<Descendant[]>(initialValue)

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
                            plain_text_body: body,
                            json_body: value,
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
                            sort: currentSort,
                            application_short_name,
                        })

                        changeUseMain(false)

                        console.log('RESPONSE', response)
                        console.log('DATA', data)

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

                            console.log('CLONED', cloned)

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
        },
    })

    return (
        <div>
            {checkError ? <Alert severity="error">{errorMessage}</Alert> : ''}
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
