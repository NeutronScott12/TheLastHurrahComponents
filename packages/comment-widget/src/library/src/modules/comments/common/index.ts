import * as yup from 'yup'
import { cache } from '../../../apollo/cache'
import {
    FindOneOrCreateOneThreadDocument,
    FindOneOrCreateOneThreadQuery,
} from '../../../generated/graphql'

export const FIND_ONE_OR_CREATE_ONE_THREAD_QUERY_OPTIONS = {}

export const commentValidationSchema = yup.object().shape({
    body: yup.string().required(),
})

interface IFindOneOrCreateOneThreadQueryCacheArgs {
    application_id: string
    title: string
    website_url: string

    limit: number
    skip: number
}

export const findOneOrCreateOneThreadQueryCache = ({
    application_id,
    title,
    website_url,
    limit,
    skip,
}: IFindOneOrCreateOneThreadQueryCacheArgs) => {
    return cache.readQuery<FindOneOrCreateOneThreadQuery>({
        query: FindOneOrCreateOneThreadDocument,
        variables: {
            findOrCreateOneThreadInput: {
                application_id,
                title,
                website_url,
            },
            FetchThreadCommentsById: {
                limit,
                skip,
            },
        },
    })
}

interface IWriteOneOrCreateOneThreadQueryCacheArgs
    extends IFindOneOrCreateOneThreadQueryCacheArgs {
    data: {}
}

export const writeOneOrCreateOneThreadQueryCache = ({
    application_id,
    title,
    website_url,
    limit,
    skip,
    data,
}: IWriteOneOrCreateOneThreadQueryCacheArgs) => {
    cache.writeQuery({
        query: FindOneOrCreateOneThreadDocument,
        variables: {
            findOrCreateOneThreadInput: {
                application_id,
                title,
                website_url,
            },
            FetchThreadCommentsById: {
                limit,
                skip,
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
