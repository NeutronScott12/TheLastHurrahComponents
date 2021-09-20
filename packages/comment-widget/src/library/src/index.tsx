import React from 'react'
import { ApolloProvider } from '@apollo/client'

import 'semantic-ui-css/semantic.min.css'

import { CommentContainer } from './modules/comments'
import { client } from './apollo'

export const BinaryStashCommentComponent = () => {
    const title = 'first title'
    const website_url = 'http://localhost:3000'
    const application_id = '17e34e6a-36bc-4e47-a75f-cfc8f053bdb5'

    return (
        <ApolloProvider client={client}>
            <h2>Binary Stash Comment Component</h2>
            <CommentContainer
                title={title}
                website_url={website_url}
                application_id={application_id}
            />
        </ApolloProvider>
    )
}
