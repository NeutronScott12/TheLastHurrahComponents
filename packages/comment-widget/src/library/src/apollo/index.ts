import { ApolloClient, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

import { cache } from './cache'
import { typeDefs } from './typeDefs'

const token = localStorage.getItem('binary-stash-token')

const uri =
    process.env.NODE_ENV === 'production'
        ? 'https://lasthurrah.co.uk/graphql'
        : 'http://localhost:4000/graphql'

const httpLink = createHttpLink({
    uri,
})

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: 'token' ? `Bearer ${token}` : '',
        },
    }
})

const subUri =
    process.env.NODE_ENV === 'production'
        ? 'wss://lasthurrah.co.uk/ws-graphql'
        : 'ws://localhost:4003/graphql'

const wsLink = new WebSocketLink({
    uri: subUri,
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
