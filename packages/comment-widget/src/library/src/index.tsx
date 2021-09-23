import React from 'react'
import { ApolloProvider } from '@apollo/client'

import 'semantic-ui-css/semantic.min.css'

import { CommentContainer } from './modules/comments'
import { client } from './apollo'

export const BinaryStashCommentComponent: React.FC<{}> = () => {
    const title = 'first title'
    const website_url = 'http://localhost:3000'
    const application_id = '17e34e6a-36bc-4e47-a75f-cfc8f053bdb5'
    const application_name = 'First Application'

    return (
        <ApolloProvider client={client}>
            <CommentContainer
                application_name={application_name}
                title={title}
                website_url={website_url}
                application_id={application_id}
            />
        </ApolloProvider>
    )
}
