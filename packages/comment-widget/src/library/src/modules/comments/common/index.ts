import * as yup from 'yup'
import { cache } from '../../../apollo/cache'
import {
    FetchCommentByThreadIdDocument,
    FetchCommentByThreadIdQuery,
} from '../../../generated/graphql'

export const FIND_ONE_OR_CREATE_ONE_THREAD_QUERY_OPTIONS = {}

export const commentValidationSchema = yup.object().shape({
    body: yup.string().required(),
})

interface IFetchCommentByThreadIdQueryArgs {
    thread_id: string
    limit: number
    skip: number
}

export const fetchCommentByThreadIdQueryCache = ({
    thread_id,
    limit,
    skip,
}: IFetchCommentByThreadIdQueryArgs) => {
    return cache.readQuery<FetchCommentByThreadIdQuery>({
        query: FetchCommentByThreadIdDocument,
        variables: {
            fetchCommentByThreadIdInput: { thread_id, limit, skip },
        },
    })
}

interface IWriteCommentByThreadIdQueryArgs
    extends IFetchCommentByThreadIdQueryArgs {
    data: {}
}

export const WriteCommentByThreadIdQueryArgs = ({
    thread_id,
    limit,
    skip,
    data,
}: IWriteCommentByThreadIdQueryArgs) => {
    cache.writeQuery({
        query: FetchCommentByThreadIdDocument,
        variables: {
            fetchCommentByThreadIdInput: { thread_id, limit, skip },
        },
        data,
    })
}

// {
//     query: FindOneOrCreateOneThreadDocument,
//     variables: {
//         findOrCreateOneThreadInput: {
//             application_id,
//             title,
//             website_url,
//         },
//         FetchThreadCommentsById: {
//             limit,
//             skip,
//         },
//     },
// },

// FindOneOrCreateOneThreadQuery
