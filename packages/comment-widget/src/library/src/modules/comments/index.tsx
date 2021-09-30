import React, { useEffect, useState } from 'react'
import {
    BinaryStashAuthenticator,
    ILoginResponse,
} from '@thelasthurrah/binary-stash-authentication'

import {
    useCurrentUserQuery,
    useFindOneOrCreateOneThreadQuery,
} from '../../generated/graphql'
import { CommentList } from './components/CommentList'
import { useCurrentUser } from '../../utils/customApolloHooks'
import { cache, IS_LOGGED_IN } from '../../apollo/cache'
import { Loader } from './common/Loader'

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
    const [limit, changeLimit] = useState(10)
    const [skip] = useState(0)
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

    const { data, loading, fetchMore } = useFindOneOrCreateOneThreadQuery({
        variables: {
            findOrCreateOneThreadInput: {
                application_id,
                title,
                website_url,
            },
        },
    })

    const logInCallback = (response: ILoginResponse) => {
        console.log('RESPONSE', response)

        localStorage.setItem('binary-stash-token', response.login_user.token)

        cache.writeQuery({
            query: IS_LOGGED_IN,
            data: {
                isLoggedIn: true,
            },
        })
    }

    return loading && currentUserLoading ? (
        <Loader />
    ) : (
        <div>
            {currentUserData && currentUserData.isLoggedIn === false ? (
                <BinaryStashAuthenticator
                    logInCallback={logInCallback}
                    application_id={application_id}
                    application_name={application_name}
                />
            ) : (
                ''
            )}

            {data && data.find_one_thread_or_create_one ? (
                <CommentList
                    title={title}
                    application_id={application_id}
                    website_url={website_url}
                    fetchMore={fetchMore}
                    limit={limit}
                    skip={skip}
                    changeLimit={changeLimit}
                    //@ts-ignore

                    logged_in={
                        currentUserData && currentUserData.isLoggedIn
                            ? true
                            : false
                    }
                    thread_id={data.find_one_thread_or_create_one.id}
                />
            ) : (
                ''
            )}
        </div>
    )
}
