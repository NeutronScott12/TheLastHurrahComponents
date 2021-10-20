import React, { useCallback, useState } from 'react'
import { Alert } from '@material-ui/lab'
import { useFormik } from 'formik'
import isHotkey from 'is-hotkey'
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

import { Sort, useEditThreadCommentMutation } from '../../../generated/graphql'
import {
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../common'

import { IComment } from './Comment'

import { Descendant } from 'slate'
import { RichTextEditorView } from '../views/RichTextEditorView'

interface IEditCommentForm {
    changeUseEdit: React.Dispatch<React.SetStateAction<boolean>>
    changeUseReplyEdit?: React.Dispatch<React.SetStateAction<boolean>>
    thread_id: string
    comment: IComment
    application_id: string
    title: string
    website_url: string
    limit: number
    skip: number
    currentSort: Sort
    application_short_name: string
}

export const EditCommentForm: React.FC<IEditCommentForm> = ({
    changeUseEdit,
    changeUseReplyEdit,
    thread_id,
    comment,
    limit,
    skip,
    currentSort,
    application_short_name,
}) => {
    const { plain_text_body, json_body, id } = comment
    const [checkError, setError] = useState(false)
    const [value, setValue] = useState<Descendant[]>(json_body)
    const [errorMessage, setErrorMessage] = useState('')
    const [editComment] = useEditThreadCommentMutation()

    const formik = useFormik({
        initialValues: {
            body: plain_text_body,
        },
        async onSubmit({ body }) {
            try {
                if (body === plain_text_body) {
                    changeUseEdit(false)
                    if (changeUseReplyEdit) {
                        changeUseReplyEdit(false)
                    }
                } else {
                    await editComment({
                        variables: {
                            UpdateCommentInput: {
                                plain_text_body: body,
                                json_body: value,
                                comment_id: id,
                            },
                        },
                        update(cache, { data }) {
                            const response = fetchCommentByThreadIdQueryCache({
                                thread_id,
                                limit,
                                skip,
                                application_short_name,
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
                                    application_short_name,
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
                <RichTextEditorView
                    setFieldValue={formik.setFieldValue}
                    value={value}
                    setValue={setValue}
                />
            </form>
        </div>
    )
}
