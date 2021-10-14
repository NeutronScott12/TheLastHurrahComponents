import { htmlSerialiser } from '../../../utils/richTextEditor/serialisers'
import { IComment } from '../components/Comment'
import { IPinnedComment } from '../types'

export const displayHtml = (comment: IComment | IPinnedComment): string => {
    return comment.json_body.map(htmlSerialiser).join('')
}
