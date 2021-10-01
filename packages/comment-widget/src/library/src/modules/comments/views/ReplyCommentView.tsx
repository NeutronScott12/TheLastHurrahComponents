import React, { useState } from 'react'
import { ArrowLeft } from '@mui/icons-material'
import { Comment } from 'semantic-ui-react'
import Moment from 'react-moment'

import { IComment } from '../components/Comment'
import { EditCommentForm } from '../components/EditComment'
import { ReplyCommentForm } from '../components/ReplyCommentForm'
import { CurrentUserQuery, Sort } from '../../../generated/graphql'
import { Ratings } from '../components/Rating'

interface IReplyCommentView {
    deleteComment: (id: string) => void
    deleteReplyComment: (id: string, parent_id: string) => void
    changeUseEdit: React.Dispatch<React.SetStateAction<boolean>>
    displayModerator: (author_id: string) => boolean
    isModerator: boolean
    thread_id: string
    reply: IComment
    currentUser: CurrentUserQuery | undefined
    limit: number
    skip: number
    website_url: string
    title: string
    comment: IComment
    currentSort: Sort
}

export const ReplyCommentView: React.FC<IReplyCommentView> = ({
    deleteReplyComment,
    changeUseEdit,
    displayModerator,
    thread_id,
    reply,
    limit,
    skip,
    website_url,
    title,
    comment,
    currentUser,
    isModerator,
    currentSort,
}) => {
    const [useSecondaryReply, changeUseEditSecondary] = useState(false)
    const [useReplyEdit, changeUseReplyEdit] = useState(false)

    return (
        <Comment key={reply.id}>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
            <Comment.Content>
                <Comment.Author as="a">{reply.author.username}</Comment.Author>
                <Comment.Metadata>
                    {displayModerator(reply.author.id) ? 'Mod' : ''}
                </Comment.Metadata>
                <Comment.Metadata>
                    <ArrowLeft />
                    Replied To {reply.replied_to_user?.username}
                </Comment.Metadata>
                <Comment.Metadata>
                    <Moment format="DD/MM/YYYY">{reply.created_at}</Moment>
                </Comment.Metadata>
                <Comment.Text>
                    {useReplyEdit ? (
                        <EditCommentForm
                            currentSort={currentSort}
                            application_id={comment.application_id}
                            website_url={website_url}
                            thread_id={thread_id}
                            limit={limit}
                            skip={skip}
                            title={title}
                            changeUseReplyEdit={changeUseReplyEdit}
                            comment_id={reply.id}
                            changeUseEdit={changeUseEdit}
                            comment_body={reply.plain_text_body}
                        />
                    ) : (
                        reply.plain_text_body
                    )}
                </Comment.Text>
                <Comment.Actions>
                    <Ratings comment={reply} />
                    <Comment.Action
                        onClick={() =>
                            changeUseEditSecondary(!useSecondaryReply)
                        }
                    >
                        Reply
                    </Comment.Action>
                    {(currentUser &&
                        currentUser.current_user.id === reply.author.id) ||
                    isModerator ? (
                        <>
                            <Comment.Action
                                onClick={() =>
                                    changeUseReplyEdit(!useReplyEdit)
                                }
                            >
                                Edit
                            </Comment.Action>
                            <Comment.Action
                                onClick={() => {
                                    if (reply.parent_id) {
                                        deleteReplyComment(
                                            reply.id,
                                            reply.parent_id,
                                        )
                                    }
                                }}
                            >
                                delete
                            </Comment.Action>
                        </>
                    ) : (
                        ''
                    )}
                </Comment.Actions>
                {useSecondaryReply ? (
                    <ReplyCommentForm
                        currentSort={currentSort}
                        limit={limit}
                        skip={skip}
                        comment={comment}
                        replied_to_id={reply.author.id}
                        changeUseMain={changeUseEditSecondary}
                        parent_id={comment.id}
                    />
                ) : (
                    ''
                )}
            </Comment.Content>
        </Comment>
    )
}
