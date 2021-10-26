import React, { useCallback, useState } from 'react'
import { FormikErrors } from 'formik'
import { createEditor, Descendant } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { Button as MUIButton } from '@mui/material'

import { plainTextserialiser } from '../../../utils/richTextEditor/serialisers'
import { Toolbar } from '../helpers/RichTextEditorViews'
import {
    BlockButton,
    Leaf,
    MarkButton,
    Element,
    HOTKEYS,
    toggleMark,
} from '../helpers/richTextEditor'
import isHotkey from 'is-hotkey'

interface IRichTextEditorView {
    value: Descendant[]
    setValue: React.Dispatch<React.SetStateAction<Descendant[]>>
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined,
    ) =>
        | Promise<void>
        | Promise<
              FormikErrors<{
                  body: string
              }>
          >
}

export const RichTextEditorView: React.FC<IRichTextEditorView> = ({
    setFieldValue,
    setValue,
    value,
}) => {
    const renderElement = useCallback((props) => <Element {...props} />, [])
    const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
    //@ts-ignore
    const [editor] = useState(() => withHistory(withReact(createEditor())), [])

    return (
        <>
            <Slate
                editor={editor}
                value={value}
                onChange={(values) => {
                    setValue(values)
                    setFieldValue('body', plainTextserialiser(values))
                    // formik.handleChange(plainTextserialiser(values))
                }}
            >
                <Toolbar style={{ padding: '.9rem', marginLeft: '.5rem' }}>
                    <MarkButton format="bold" icon="format_bold" />
                    <MarkButton format="italic" icon="format_italic" />
                    <MarkButton format="underline" icon="format_underlined" />
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
                    onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
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
        </>
    )
}
