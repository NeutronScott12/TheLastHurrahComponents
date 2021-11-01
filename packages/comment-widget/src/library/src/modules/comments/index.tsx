import React, { useEffect, useState } from 'react'
import {
    BinaryStashAuthenticator,
    ILoginResponse,
} from '@thelasthurrah/binary-stash-authentication'

import {
    useCurrentUserQuery,
    useFindOneApplicationByIdQuery,
    useFindOneOrCreateOneThreadQuery,
} from '../../generated/graphql'
import { CommentList } from './containers/CommentList'
import { useIsLoggedIn } from '../../utils/customApolloHooks'
import { cache, CURRENT_USER_CLIENT, IS_LOGGED_IN } from '../../apollo/cache'
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
    const [loggedIn, setLoggedIn] = useState(false)
    const { data: currentUserData } = useIsLoggedIn()
    const { data: applicationData } = useFindOneApplicationByIdQuery({
        variables: { id: application_id },
    })
    const { data: currentUser, loading: currentUserLoading } =
        useCurrentUserQuery()

    useEffect(() => {
        if (applicationData && currentUser) {
            cache.writeQuery({
                query: IS_LOGGED_IN,
                data: {
                    isLoggedIn: true,
                },
            })

            const match =
                applicationData.find_one_application_by_id.moderators.some(
                    ({ id }) => id === currentUser.current_user.id,
                )
            const isOwner =
                applicationData.find_one_application_by_id.application_owner
                    .username === currentUser.current_user.username
            cache.writeQuery({
                query: CURRENT_USER_CLIENT,
                data: {
                    username: currentUser.current_user.username,
                    id: currentUser.current_user.id,
                    isModerator: match || isOwner,
                    isOwner,
                },
            })
            setLoggedIn(true)
        }
    }, [currentUser, applicationData])

    const { data, loading, fetchMore, refetch } =
        useFindOneOrCreateOneThreadQuery({
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
        localStorage.setItem('binary-stash-token', response.token)

        cache.writeQuery({
            query: IS_LOGGED_IN,
            data: {
                isLoggedIn: true,
            },
        })
        refetch()
        setLoggedIn(true)
    }

    return loading || currentUserLoading ? (
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

            {data &&
            data.find_one_thread_or_create_one &&
            applicationData &&
            applicationData.find_one_application_by_id.short_name &&
            loggedIn ? (
                <CommentList
                    title={title}
                    application_id={application_id}
                    website_url={website_url}
                    fetchMore={fetchMore}
                    limit={limit}
                    skip={skip}
                    changeLimit={changeLimit}
                    //@ts-ignore
                    setLoggedIn={setLoggedIn}
                    application_short_name={
                        applicationData.find_one_application_by_id.short_name
                    }
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

            {currentUserData &&
            currentUserData.isLoggedIn === true &&
            data &&
            data === undefined ? (
                <h2>No Thread exists</h2>
            ) : (
                ''
            )}
        </div>
    )
}
