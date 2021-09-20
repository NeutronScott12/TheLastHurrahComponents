import { gql, InMemoryCache } from '@apollo/client'

const localCache: InMemoryCache = new InMemoryCache({})

export const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`

localCache.writeQuery({
    query: IS_LOGGED_IN,
    data: {
        isLoggedIn: false,
    },
})

export const cache = localCache
