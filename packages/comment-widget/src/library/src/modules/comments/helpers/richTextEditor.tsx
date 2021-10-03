import { Descendant, Editor, Transforms, Element as SlateElement } from 'slate'
import { useSlate } from 'slate-react'
import { Button, Icon } from './RichTextEditorViews'

export const HOTKEYS = {
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

export const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const toggleBlock = (editor: Editor, format: any) => {
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

export const toggleMark = (editor: Editor, format: string) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

export const isBlockActive = (editor: Editor, format: string) => {
    const [match] = Editor.nodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            //@ts-ignore
            n.type === format,
    })

    return !!match
}

export const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor)
    //@ts-ignore
    return marks ? marks[format] === true : false
}

export const Leaf = ({ attributes, children, leaf }: any) => {
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

export const BlockButton = ({
    format,
    icon,
}: {
    format: string
    icon: string
}) => {
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

export const MarkButton = ({
    format,
    icon,
}: {
    format: string
    icon: string
}) => {
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

export const Element = ({ attributes, children, element }: any) => {
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
