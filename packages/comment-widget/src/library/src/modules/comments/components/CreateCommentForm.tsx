import React, { useCallback, useState, useMemo } from 'react'
import { Formik, useFormik } from 'formik'
import { clone, mergeDeepRight } from 'ramda'
import {
    createEditor,
    Descendant,
    Editor,
    Transforms,
    Element as SlateElement,
} from 'slate'
import { withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import isHotkey from 'is-hotkey'
import { Editable, Slate } from 'slate-react'
import { Button as MUIButton } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Html from 'slate-html-serializer'

import { Sort, useCreateThreadComentMutation } from '../../../generated/graphql'
import {
    commentValidationSchema,
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../common'
import {
    Leaf,
    Element,
    MarkButton,
    BlockButton,
    HOTKEYS,
    toggleMark,
} from '../helpers/richTextEditor'
import {
    plainTextserialiser,
    htmlSerialiser,
} from '../../../utils/richTextEditor/serialisers'
import { Toolbar } from '../views/RichTextEditorViews'

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
    const renderElement = useCallback((props) => <Element {...props} />, [])
    const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
    //@ts-ignore
    const [editor] = useState(() => withHistory(withReact(createEditor())), [])

    const [createComment] = useCreateThreadComentMutation()
    const formik = useFormik({
        initialValues: {
            body: '',
        },
        // validationSchema: commentValidationSchema,
        async onSubmit({ body }, { resetForm, setSubmitting }) {
            try {
                console.log('body', body)
                console.log('VALUES', value)
                const html = new Html()
                console.log(await commentValidationSchema.validate({ body }))
                console.log(html.serialize(value, { render: false }))

                // console.log(htmlSerialiser(value))

                // await createComment({
                //     variables: {
                //         createCommentInput: {
                //             application_id,
                //             plain_text_body: plainTextserialiser(values),
                //             json_body: values,
                //             thread_id,
                //         },
                //     },
                //     update(cache, { data }) {
                //         const response = fetchCommentByThreadIdQueryCache({
                //             thread_id,
                //             limit,
                //             skip,
                //             sort: currentSort,
                //         })

                //         if (
                //             response &&
                //             response.fetch_comments_by_thread_id &&
                //             data &&
                //             data.create_comment
                //         ) {
                //             const cloneData = clone(response)
                //             const newData = {
                //                 fetch_comments_by_thread_id: {
                //                     __typename:
                //                         response.fetch_comments_by_thread_id
                //                             .__typename,
                //                     comments_count:
                //                         cloneData.fetch_comments_by_thread_id
                //                             .comments_count,
                //                     comments: [
                //                         data.create_comment,
                //                         ...cloneData.fetch_comments_by_thread_id
                //                             .comments,
                //                     ],
                //                 },
                //             }

                //             const changedObject = mergeDeepRight(
                //                 cloneData,
                //                 newData,
                //             )

                //             WriteCommentByThreadIdQueryArgs({
                //                 thread_id,
                //                 limit,
                //                 skip,
                //                 sort: currentSort,
                //                 data: changedObject,
                //             })
                //         }
                //     },
                // })

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
                <Slate
                    editor={editor}
                    value={value}
                    onChange={(values) => {
                        setValue(values)
                        formik.setFieldValue(
                            'body',
                            plainTextserialiser(values),
                        )
                        // formik.handleChange(plainTextserialiser(values))
                    }}
                >
                    <Toolbar style={{ padding: '.9rem', marginLeft: '.5rem' }}>
                        <MarkButton format="bold" icon="format_bold" />
                        <MarkButton format="italic" icon="format_italic" />
                        <MarkButton
                            format="underline"
                            icon="format_underlined"
                        />
                        <MarkButton format="code" icon="code" />
                        <BlockButton format="heading-one" icon="looks_one" />
                        <BlockButton format="heading-two" icon="looks_two" />
                        <BlockButton format="block-quote" icon="format_quote" />
                        <BlockButton
                            format="numbered-list"
                            icon="format_list_numbered"
                        />
                        <BlockButton
                            format="bulleted-list"
                            icon="format_list_bulleted"
                        />
                    </Toolbar>
                    <Editable
                        id="body"
                        name="body"
                        style={{ marginBottom: '5rem', fontSize: '1.5em' }}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Join the discussion thread"
                        spellCheck
                        autoFocus
                        onKeyDown={(
                            event: React.KeyboardEvent<HTMLDivElement>,
                        ) => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault()
                                    //@ts-ignore
                                    const mark = HOTKEYS[hotkey]
                                    toggleMark(editor, mark)
                                }
                            }
                        }}
                    />
                </Slate>
                <MUIButton
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                >
                    Submit
                </MUIButton>
            </form>
        </div>
    )
}
