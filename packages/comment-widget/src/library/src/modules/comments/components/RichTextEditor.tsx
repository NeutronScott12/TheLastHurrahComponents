import isHotkey from 'is-hotkey'
import React, { useCallback, useState } from 'react'
import { Button as MUIButton } from '@mui/material'
import {
    createEditor,
    Descendant,
    Editor,
    Transforms,
    Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, useSlate, withReact } from 'slate-react'
import { Button, Icon, Toolbar } from '../views/RichTextEditorViews'
import { plainTextserialiser } from '../../../utils/richTextEditor/serialisers'
import { useCreateThreadComentMutation } from '../../../generated/graphql'

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

const initialValue: Descendant[] = [
    {
        //@ts-ignore
        type: 'paragraph',
        children: [{ text: '' }],
    },
]

const LIST_TYPES = ['numbered-list', 'bulleted-list']

interface IRichTextEditor {
    application_id: string
    thread_id: string
}

export const RichTextEditor: React.FC<IRichTextEditor> = ({
    application_id,
    thread_id,
}) => {
    const [createComment] = useCreateThreadComentMutation()
    const [value, setValue] = useState<Descendant[]>(initialValue)
    const renderElement = useCallback((props) => <Element {...props} />, [])
    const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
    //@ts-ignore
    const [editor] = useState(() => withHistory(withReact(createEditor())), [])

    const submitForm = async () => {
        console.log(value)

        const plainText = plainTextserialiser(value)

        console.log('PLAIN_TEXT', plainText)

        await createComment({
            variables: {
                createCommentInput: {
                    plain_text_body: plainText,
                    json_body: value,
                    application_id,
                    thread_id,
                },
            },
        })
    }

    return (
        <>
            <Slate
                editor={editor}
                value={value}
                onChange={(value) => setValue(value)}
            >
                <Toolbar>
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
                onClick={submitForm}
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

const toggleBlock = (editor: Editor, format: any) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: (n) =>
            LIST_TYPES.includes(
                //@ts-ignore
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type,
            ),
        split: true,
    })
    const newProperties: Partial<SlateElement> = {
        //@ts-ignore
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor: Editor, format: string) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const isBlockActive = (editor: Editor, format: string) => {
    const [match] = Editor.nodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            //@ts-ignore
            n.type === format,
    })

    return !!match
}

const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor)
    //@ts-ignore
    return marks ? marks[format] === true : false
}

const Leaf = ({ attributes, children, leaf }: any) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }: { format: string; icon: string }) => {
    const editor = useSlate()
    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={(event: React.ChangeEvent<MouseEvent>) => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
            <Icon>{icon}</Icon>
        </Button>
    )
}

const MarkButton = ({ format, icon }: { format: string; icon: string }) => {
    const editor = useSlate()
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={(event: React.ChangeEvent<MouseEvent>) => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            <Icon>{icon}</Icon>
        </Button>
    )
}

const Element = ({ attributes, children, element }: any) => {
    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>
        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        default:
            return <p {...attributes}>{children}</p>
    }
}
