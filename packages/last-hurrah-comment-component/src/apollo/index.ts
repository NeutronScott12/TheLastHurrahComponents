import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
})
