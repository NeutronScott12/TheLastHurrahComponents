import React, { useState, useEffect } from 'react'
import { Comment } from 'semantic-ui-react'

import { CommentComponent, IComment } from '../components/Comment'
import { CreateCommentForm } from '../components/CreateCommentForm'
import {
    ApolloQueryResult,
    DocumentNode,
    FetchMoreOptions,
    FetchMoreQueryOptions,
    TypedDocumentNode,
    useSubscription,
} from '@apollo/client'
import {
    Sort,
    useFetchCommentByThreadIdQuery,
    useFindOneApplicationByIdQuery,
    useFindThreadByIdQuery,
} from '../../../generated/graphql'
import { Loader } from '../common/Loader'
import { MenuBar } from '../components/MenuBar'
import { PinnedCommentView } from '../views/PinnedComment'
import { VoteFormComponent } from '../components/VoteFormComponent'
import { VoteComponent } from '../components/VoteComponent'
import { useCurrentUserClient } from '../../../utils/customApolloHooks'
import {
    COMMENT_ADDED_SUBSCRIPTION,
    ICommentAddedSubscriptionResponse,
    ICommentAddedSubscriptionVariables,
} from '../graphql'
import {
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../common'
import { clone, mergeDeepRight } from 'ramda'
import { Button } from '@mui/material'
// import { FilterComments } from '../components/FilterComments'

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
    const [pendingComments, setPendingComments] = useState<IComment[]>([])
    const [pendingReplies, setPendingReplies] = useState<IComment[]>([])
    const { data: currentUserClient } = useCurrentUserClient()
    const {
        loading: commentSubscriptionLoading,
        data: commentSubscriptionData,
    } = useSubscription<
        ICommentAddedSubscriptionResponse,
        ICommentAddedSubscriptionVariables
    >(COMMENT_ADDED_SUBSCRIPTION, {
        variables: { thread_id },
    })
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
        if (commentSubscriptionData && commentSubscriptionData.comment_added) {
            if (commentSubscriptionData.comment_added.parent_id == null) {
                setPendingComments((prevPendingComments) => [
                    commentSubscriptionData.comment_added,
                    ...prevPendingComments,
                ])
            } else {
                setPendingReplies((prevPendingReplies) => [
                    commentSubscriptionData.comment_added,
                    ...prevPendingReplies,
                ])
            }
        }
    }, [commentSubscriptionData])

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

    const showPendingComments = () => {
        if (commentSubscriptionData) {
            const response = fetchCommentByThreadIdQueryCache({
                thread_id,
                limit,
                skip,
                sort: currentSort,
                application_short_name,
            })

            if (response?.fetch_comments_by_thread_id.comments) {
                const cloneData = clone(response)
                pendingComments.forEach(
                    //@ts-ignore
                    (comment) => (comment['__typename'] = 'CommentModel'),
                )
                const newData = {
                    fetch_comments_by_thread_id: {
                        __typename:
                            response.fetch_comments_by_thread_id.__typename,
                        comments_count:
                            cloneData.fetch_comments_by_thread_id
                                .comments_count,
                        comments: [
                            ...pendingComments,
                            ...cloneData.fetch_comments_by_thread_id.comments,
                        ],
                    },
                }
                setPendingComments([])

                const changedObject = mergeDeepRight(cloneData, newData)

                WriteCommentByThreadIdQueryArgs({
                    thread_id,
                    limit,
                    skip,
                    sort: currentSort,
                    application_short_name,
                    data: changedObject,
                })
            }
        }
    }

    console.log('COMMENT_LIST')

    return threadloading &&
        loading &&
        commentSubscriptionLoading &&
        data &&
        data.fetch_comments_by_thread_id.comments ? (
        <Loader />
    ) : (
        <div>
            <MenuBar thread_id={thread_id} setLoggedIn={setLoggedIn} />
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

            {/* <FilterComments
                currentSort={currentSort}
                changeCurrentSort={changeCurrentSort}
            /> */}

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

            {threadData?.find_thread_by_id &&
            threadData.find_thread_by_id.pinned_comment ? (
                <PinnedCommentView
                    comment={threadData.find_thread_by_id.pinned_comment}
                />
            ) : (
                ''
            )}

            {pendingComments.length > 0 ? (
                <Button onClick={showPendingComments}>
                    {pendingComments.length} Show More
                </Button>
            ) : (
                ''
            )}

            <Comment.Group
                style={{
                    overflowY: 'scroll',
                    maxWidth: '100%',
                    width: '100%',
                    maxHeight: '500px',
                }}
                size="huge"
            >
                {data &&
                    data.fetch_comments_by_thread_id.comments.map((comment) => {
                        return (
                            <CommentComponent
                                pendingReplies={pendingReplies}
                                setPendingReplies={setPendingReplies}
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
