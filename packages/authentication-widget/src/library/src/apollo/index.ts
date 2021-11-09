import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache({})

const uri =
	process.env.NODE_ENV === 'production'
		? 'http://178.79.188.58/graphql'
		: 'http://localhost:4000/graphql'

const httpLink = createHttpLink({
	uri,
})

export const client = new ApolloClient({
	link: httpLink,
	cache,
})
