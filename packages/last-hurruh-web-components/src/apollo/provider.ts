import { createApolloProvider } from '@vue/apollo-option'

import { apolloClient } from '.'

export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})
