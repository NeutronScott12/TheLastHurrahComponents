import React from 'react'
import { ApolloProvider } from '@apollo/client'

import 'semantic-ui-css/semantic.min.css'

import { CommentContainer } from './modules/comments'
import { client } from './apollo'

export interface IBinaryStashCommentComponentProps {
    title: string
    website_url: string
    application_id: string
    application_name: string
}

export const BinaryStashCommentComponent: React.FC<IBinaryStashCommentComponentProps> =
    (props) => (
        <ApolloProvider client={client}>
            <CommentContainer {...props} />
        </ApolloProvider>
    )
