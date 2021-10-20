import * as yup from 'yup'
import { cache } from '../../../apollo/cache'
import {
    FetchCommentByThreadIdDocument,
    FetchCommentByThreadIdQuery,
    Sort,
} from '../../../generated/graphql'

export const FIND_ONE_OR_CREATE_ONE_THREAD_QUERY_OPTIONS = {}

export const commentValidationSchema = yup.object().shape({
    body: yup.string().required(),
})

interface IFetchCommentByThreadIdQueryArgs {
    thread_id: string
    limit: number
    skip: number
    sort: Sort
    application_short_name: string
}

export const fetchCommentByThreadIdQueryCache = ({
    thread_id,
    limit,
    skip,
    sort,
    application_short_name,
}: IFetchCommentByThreadIdQueryArgs) => {
    return cache.readQuery<FetchCommentByThreadIdQuery>({
        query: FetchCommentByThreadIdDocument,
        variables: {
            fetchCommentByThreadIdInput: {
                thread_id,
                limit,
                skip,
                sort,
                application_short_name,
            },
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
    sort,
    application_short_name,
    data,
}: IWriteCommentByThreadIdQueryArgs) => {
    cache.writeQuery({
        query: FetchCommentByThreadIdDocument,
        variables: {
            fetchCommentByThreadIdInput: {
                thread_id,
                limit,
                skip,
                sort,
                application_short_name,
            },
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
