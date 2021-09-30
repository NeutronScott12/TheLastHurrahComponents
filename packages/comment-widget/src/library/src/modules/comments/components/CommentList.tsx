import React from 'react'
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
import { useFetchCommentByThreadIdQuery } from '../../../generated/graphql'
import { Loader } from '../common/Loader'

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
    changeLimit,
    limit,
    skip,
    title,
    website_url,
    fetchMore,
}) => {
    const { data, loading } = useFetchCommentByThreadIdQuery({
        variables: { fetchCommentByThreadIdInput: { thread_id, limit, skip } },
    })

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

    return loading && data && data.fetch_comments_by_thread_id.comments ? (
        <Loader />
    ) : (
        <div>
            {logged_in ? (
                <CreateCommentForm
                    application_id={application_id}
                    thread_id={thread_id}
                    limit={limit}
                    skip={skip}
                    title={title}
                    website_url={website_url}
                />
            ) : (
                ''
            )}

            <Comment.Group size="huge">
                {data &&
                    data.fetch_comments_by_thread_id.comments.map((comment) => {
                        return (
                            <CommentComponent
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
