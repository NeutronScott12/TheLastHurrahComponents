import React, { useEffect } from 'react'
import { BinaryStashAuthenticator } from '@thelasthurrah/binary-stash-authentication'

import {
    useCurrentUserQuery,
    useFindOneOrCreateOneThreadQuery,
} from '../../generated/graphql'
import { CommentList } from './components/CommentList'
import { useCurrentUser } from '../../utils/customApolloHooks'
import { cache, IS_LOGGED_IN } from '../../apollo/cache'
import { Grid } from '@material-ui/core'
import { Loader } from './components/Loader'

interface ICommentContainerProps {
    application_id: string
    website_url: string
    title: string
    application_name: string
}

// enum CHANGE_DISPLAY {
//     AUTHENTICATE,
//     COMMENTS,
// }

export const CommentContainer: React.FC<ICommentContainerProps> = ({
    application_id,
    website_url,
    title,
    application_name,
}) => {
    const { data: currentUserData } = useCurrentUser()
    const { data: currentUser, loading: currentUserLoading } =
        useCurrentUserQuery()

    useEffect(() => {
        if (currentUser) {
            cache.writeQuery({
                query: IS_LOGGED_IN,
                data: {
                    isLoggedIn: true,
                },
            })
        }
    })

    const { data, loading } = useFindOneOrCreateOneThreadQuery({
        variables: {
            findOrCreateOneThreadInput: {
                application_id,
                title,
                website_url,
            },
        },
    })

    return loading && currentUserLoading ? (
        <Loader />
    ) : (
        <div>
            {currentUserData && currentUserData.isLoggedIn === false ? (
                <BinaryStashAuthenticator
                    application_id={application_id}
                    application_name={application_name}
                />
            ) : (
                ''
            )}

            <Grid
                container
                spacing={0}
                direction="column"
                // alignItems="center"
                // justifyContent="center"
                style={{ padding: '5rem', margin: 'auto' }}
            >
                <CommentList
                    logged_in={
                        currentUserData && currentUserData.isLoggedIn
                            ? true
                            : false
                    }
                    application_id={application_id}
                    thread_id={
                        data ? data?.find_one_thread_or_create_one.id : ''
                    }
                />
            </Grid>
        </div>
    )
}
