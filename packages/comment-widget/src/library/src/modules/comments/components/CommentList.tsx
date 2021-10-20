import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { Comment } from 'semantic-ui-react'

import { CommentComponent } from './Comment'
import { CreateCommentForm } from './CreateCommentForm'
import {
    ApolloQueryResult,
    DocumentNode,
    FetchMoreOptions,
    FetchMoreQueryOptions,
    TypedDocumentNode,
} from '@apollo/client'
import {
    Sort,
    useFetchCommentByThreadIdQuery,
    useFindOneApplicationByIdQuery,
    useFindThreadByIdQuery,
} from '../../../generated/graphql'
import { Loader } from '../common/Loader'
// import { FilterComments } from './FilterComments'
import { MenuBar } from './MenuBar'
import { PinnedCommentView } from '../views/PinnedComment'
import { VoteFormComponent } from './VoteFormComponent'
import { VoteComponent } from './VoteComponent'
import { useCurrentUserClient } from '../../../utils/customApolloHooks'

type TVariables = {}
type TData = {}
interface ICommentListProps {
    title: string
    website_url: string
    application_id: string
    thread_id: string
    logged_in: boolean
    limit: number
    skip: number
    application_short_name: string
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    changeLimit: React.Dispatch<React.SetStateAction<number>>
    fetchMore: ((
        fetchMoreOptions: FetchMoreQueryOptions<TVariables, TData> &
            FetchMoreOptions<TData, TVariables>,
    ) => Promise<ApolloQueryResult<TData>>) &
        (<TData2, TVariables2>(
            fetchMoreOptions: {
                query?: DocumentNode | TypedDocumentNode<TData, TVariables>
            } & FetchMoreQueryOptions<TVariables2, TData> &
                FetchMoreOptions<TData2, TVariables2>,
        ) => Promise<ApolloQueryResult<TData2>>)
}

export const CommentList: React.FC<ICommentListProps> = ({
    thread_id,
    application_id,
    logged_in,
    limit,
    skip,
    title,
    website_url,
    application_short_name,
    changeLimit,
    fetchMore,
    setLoggedIn,
}) => {
    const [currentSort, changeCurrentSort] = useState(Sort.Desc)
    const { data: currentUserClient } = useCurrentUserClient()
    const { data: applicationData } = useFindOneApplicationByIdQuery({
        variables: {
            id: application_id,
        },
    })
    const {
        data: threadData,
        loading: threadloading,
        refetch,
    } = useFindThreadByIdQuery({ variables: { findThreadById: { thread_id } } })
    const { data, loading } = useFetchCommentByThreadIdQuery({
        variables: {
            fetchCommentByThreadIdInput: {
                thread_id,
                limit,
                skip,
                sort: currentSort,
                application_short_name,
            },
        },
    })

    useEffect(() => {
        const localCurrent = localStorage.getItem('currentSort')
        if (localCurrent) {
            changeCurrentSort(localCurrent as Sort)
        }
    }, [])

    const fetchMoreComments = async () => {
        changeLimit(limit + 10)

        await fetchMore({
            variables: {
                findOrCreateOneThreadInput: {
                    application_id,
                    title,
                    website_url,
                },
                FetchThreadCommentsById: {
                    limit,
                    skip,
                },
            },
        })
    }

    return threadloading &&
        loading &&
        data &&
        data.fetch_comments_by_thread_id.comments ? (
        <Loader />
    ) : (
        <div>
            <MenuBar setLoggedIn={setLoggedIn} />
            {logged_in ? (
                <CreateCommentForm
                    application_short_name={application_short_name}
                    currentSort={currentSort}
                    application_id={application_id}
                    thread_id={thread_id}
                    limit={limit}
                    skip={skip}
                />
            ) : (
                ''
            )}
            {threadData?.find_thread_by_id &&
            threadData.find_thread_by_id.pinned_comment ? (
                <PinnedCommentView
                    comment={threadData.find_thread_by_id.pinned_comment}
                />
            ) : (
                ''
            )}

            {threadData?.find_thread_by_id &&
            threadData.find_thread_by_id.poll ? (
                <VoteComponent
                    refetch={refetch}
                    thread_id={thread_id}
                    poll={threadData.find_thread_by_id.poll}
                />
            ) : (
                ''
            )}

            {currentUserClient?.isModerator ? (
                <VoteFormComponent
                    moderators={
                        applicationData &&
                        applicationData.find_one_application_by_id.moderators
                    }
                    thread_id={thread_id}
                />
            ) : (
                ''
            )}

            {/* <FilterComments
                currentSort={currentSort}
                changeCurrentSort={changeCurrentSort}
            /> */}

            <Comment.Group size="huge">
                {data &&
                    data.fetch_comments_by_thread_id.comments.map((comment) => {
                        return (
                            <CommentComponent
                                application_short_name={application_short_name}
                                currentSort={currentSort}
                                thread_id={thread_id}
                                title={title}
                                application_id={application_id}
                                website_url={website_url}
                                limit={limit}
                                skip={skip}
                                key={comment.id}
                                comment={comment}
                            />
                        )
                    })}
            </Comment.Group>
            {data && data.fetch_comments_by_thread_id.comments_count > limit ? (
                <Button onClick={fetchMoreComments}>Click More</Button>
            ) : (
                ''
            )}
        </div>
    )
}
