import { Descendant, Text } from 'slate'
import escapeHtml from 'escape-html'

export const plainTextserialiser = (nodes: Descendant[]) => {
    //@ts-ignore
    return nodes.map((n) => String(n.children[0].text)).join('\n')
}

export const htmlSerialiser = (node: Descendant): string => {
    if (Text.isText(node)) {
        let string = escapeHtml(node.text)
        //@ts-ignore
        if (node.bold) {
            string = `<strong>${string}</strong>`
        }
        return string
    }

    const children = node.children.map((n) => htmlSerialiser(n)).join('')
    //@ts-ignore
    switch (node.type) {
        case 'numbered-list':
            return `<ol><li>${children}</li></ol>`
        case 'bulleted-list':
            return `<ul><li>${children}</li></ul>`
        case 'heading-one':
            return `<h1>${children}</h1>`
        case 'block-quote':
            return `<blockquote><p>${children}</p></blockquote>`
        case 'paragraph':
            return `<p>${children}</p>`
        case 'link':
            //@ts-ignore
            return `<a href="${escapeHtml(node.url)}">${children}</a>`
        default:
            return children
    }
}
