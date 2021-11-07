import React, { useEffect, useState } from 'react'
import { Comment } from 'semantic-ui-react'
import Moment from 'react-moment'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

import { IComment } from '../components/Comment'
import { ReplyCommentForm } from '../components/ReplyCommentForm'
import { EditCommentForm } from '../components/EditComment'
import { ReplyCommentView } from './ReplyCommentView'
import { CurrentUserQuery, Sort } from '../../../generated/graphql'
import { Ratings } from '../components/Rating'
import { displayHtml } from '../helpers'
import { BlockComponent } from '../components/BlockComponent'
import { ReportFormComponent } from '../components/ReportFormComponent'
import { IModerator } from '../types'
import { PendingRepliesView } from './PendingReplies'
import { NotificationReplySettings } from '../components/CommentSetting'

interface ICommentViewProps {
    currentUser: CurrentUserQuery | undefined
    thread_id: string
    comment: IComment
    limit: number
    skip: number
    website_url: string
    title: string
    moderators: IModerator[] | undefined
    currentSort: Sort
    application_short_name: string
    pendingReplies: IComment[]
    setPendingReplies: React.Dispatch<React.SetStateAction<IComment[]>>
    addPendingReplyComments: (replies: IComment[], parent_id: string) => void
    addPinnedComment: (comment_id: string) => void
    deleteComment: (id: string) => void
    deleteReplyComment: (id: string, parent_id: string) => void
}

const useStyles = makeStyles((theme: Theme) => ({
    fontStyle: {
        color: theme.palette.mode === 'dark' ? '#e8e6e3' : 'black',
    },
}))

export const CommentView: React.FC<ICommentViewProps> = ({
    thread_id,
    comment,
    title,
    skip,
    limit,
    website_url,
    currentUser,
    moderators,
    currentSort,
    application_short_name,
    pendingReplies,
    addPendingReplyComments,
    deleteComment,
    deleteReplyComment,
    addPinnedComment,
}) => {
    const classes = useStyles()
    const [useMain, changeUseMain] = useState(false)
    const [useEdit, changeUseEdit] = useState(false)
    const [openReport, changeOpenReport] = useState(false)
    // const [useReplyEdit, changeUseReplyEdit] = useState(false)
    const [isModerator, changeIsModerator] = useState(false)

    useEffect(() => {
        if (moderators && currentUser?.current_user) {
            const matches = moderators.some(
                ({ id }: IModerator) => id === currentUser.current_user.id,
            )

            changeIsModerator(matches)
        }
    }, [moderators, currentUser])

    const displayModerator = (author_id: string) => {
        if (moderators) {
            const matches = moderators.some(
                ({ id }: IModerator) => id === author_id,
            )

            return matches
        }
        return false
    }

    return (
        <Comment>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />

            <Comment.Content>
                <Comment.Author as="a">
                    <span className={classes.fontStyle}>
                        {comment.author.username}
                    </span>
                </Comment.Author>
                <Comment.Metadata>
                    <span className={classes.fontStyle}>
                        {displayModerator(comment.author.id) ? 'Mod' : ''}
                    </span>
                </Comment.Metadata>
                <Comment.Metadata>
                    <span className={classes.fontStyle}>
                        <Moment format="DD/MM/YYYY">
                            {comment.created_at}
                        </Moment>
                    </span>
                </Comment.Metadata>
                {currentUser &&
                currentUser.current_user.id !== comment.author.id &&
                comment.approved === false ? (
                    <Comment.Metadata>
                        <BlockComponent
                            changeOpenReport={changeOpenReport}
                            comment_author_id={comment.author.id}
                        />
                    </Comment.Metadata>
                ) : (
                    ''
                )}
                {currentUser &&
                currentUser.current_user.id === comment.author.id ? (
                    <Comment.Metadata>
                        <NotificationReplySettings
                            comment_id={comment.id}
                            reply_notification={comment.reply_notification}
                        />
                    </Comment.Metadata>
                ) : (
                    ''
                )}
                {comment.approved ? (
                    <Comment.Metadata>approved</Comment.Metadata>
                ) : (
                    ''
                )}
                <Comment.Text>
                    {useEdit ? (
                        <EditCommentForm
                            application_short_name={application_short_name}
                            currentSort={currentSort}
                            application_id={comment.application_id}
                            website_url={website_url}
                            thread_id={thread_id}
                            limit={limit}
                            skip={skip}
                            title={title}
                            // changeUseReplyEdit={changeUseReplyEdit}
                            comment={comment}
                            changeUseEdit={changeUseEdit}
                        />
                    ) : (
                        <>
                            {comment.pending ? (
                                'Comment waiting for approval'
                            ) : (
                                <div
                                    className={classes.fontStyle}
                                    dangerouslySetInnerHTML={{
                                        __html: displayHtml(comment),
                                    }}
                                />
                            )}
                        </>
                    )}
                </Comment.Text>
                <Comment.Actions>
                    <Ratings comment={comment} />
                    <Comment.Action onClick={() => changeUseMain(!useMain)}>
                        <span className={classes.fontStyle}>Reply</span>
                    </Comment.Action>
                    {(currentUser &&
                        currentUser.current_user.id === comment.author.id) ||
                    isModerator ? (
                        <>
                            <Comment.Action
                                onClick={() => changeUseEdit(!useEdit)}
                            >
                                Edit
                            </Comment.Action>
                            <Comment.Action
                                onClick={() => deleteComment(comment.id)}
                            >
                                delete
                            </Comment.Action>
                        </>
                    ) : (
                        ''
                    )}
                    {isModerator ? (
                        <Comment.Action
                            onClick={() => addPinnedComment(comment.id)}
                        >
                            Pin
                        </Comment.Action>
                    ) : (
                        ''
                    )}
                </Comment.Actions>

                {useMain ? (
                    <ReplyCommentForm
                        application_short_name={application_short_name}
                        currentSort={currentSort}
                        limit={limit}
                        skip={skip}
                        comment={comment}
                        replied_to_id={comment.author.id}
                        changeUseMain={changeUseMain}
                        parent_id={comment.id}
                    />
                ) : (
                    ''
                )}
                {openReport ? (
                    <ReportFormComponent
                        comment_id={comment.id}
                        changeOpenReport={changeOpenReport}
                    />
                ) : (
                    ''
                )}
                {pendingReplies.filter(
                    (replies) => replies.parent_id === comment.id,
                ).length > 0 ? (
                    <PendingRepliesView
                        addPendingReplyComments={addPendingReplyComments}
                        comment={comment}
                        pendingReplies={pendingReplies}
                    />
                ) : (
                    ''
                )}
            </Comment.Content>
            <Comment.Group size="huge">
                {comment.replies
                    ? comment.replies.map((reply) => (
                          <ReplyCommentView
                              application_short_name={application_short_name}
                              currentSort={currentSort}
                              displayModerator={displayModerator}
                              isModerator={isModerator}
                              thread_id={thread_id}
                              currentUser={currentUser}
                              key={reply.id}
                              comment={comment}
                              changeUseEdit={changeUseEdit}
                              deleteComment={deleteComment}
                              deleteReplyComment={deleteReplyComment}
                              limit={limit}
                              reply={reply}
                              skip={skip}
                              title={title}
                              website_url={website_url}
                          />
                      ))
                    : ''}
            </Comment.Group>
        </Comment>
    )
}
