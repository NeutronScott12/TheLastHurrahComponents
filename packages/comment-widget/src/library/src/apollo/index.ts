import { ApolloClient, createHttpLink, from, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

import { cache } from './cache'
import { typeDefs } from './typeDefs'

const token = localStorage.getItem('binary-stash-token')

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: 'token' ? `Bearer ${token}` : '',
        },
    }
})

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4003/graphql',
    options: {
        reconnect: true,
        connectionParams: {
            Authorization: `Bearer ${token}`,
        },
    },
})

const authHttpLink = authLink.concat(httpLink)

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    authHttpLink,
)

export const client = new ApolloClient({
    link: splitLink,
    cache,
    typeDefs,
})
