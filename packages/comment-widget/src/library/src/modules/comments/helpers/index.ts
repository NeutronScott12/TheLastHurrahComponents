import { htmlSerialiser } from '../../../utils/richTextEditor/serialisers'
import { IComment } from '../components/Comment'

export const displayHtml = (comment: IComment): string => {
    return comment.json_body.map(htmlSerialiser).join('')
}
