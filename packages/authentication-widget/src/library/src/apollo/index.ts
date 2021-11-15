import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache({})

const uri =
	process.env.NODE_ENV === 'production'
		? 'https://lasthurrah.co.uk/graphql'
		: 'http://localhost:4000/graphql'

const httpLink = createHttpLink({
	uri,
})

export const client = new ApolloClient({
	link: httpLink,
	cache,
})
