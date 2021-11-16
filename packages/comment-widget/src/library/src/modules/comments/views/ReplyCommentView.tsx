import React, { useState } from 'react'
import { ArrowLeft } from '@mui/icons-material'
import { Comment } from 'semantic-ui-react'
import Moment from 'react-moment'

import { IComment } from '../components/Comment'
import { EditCommentForm } from '../components/EditComment'
import { ReplyCommentForm } from '../components/ReplyCommentForm'
import { CurrentUserQuery, Sort } from '../../../generated/graphql'
import { Ratings } from '../components/Rating'
import { displayHtml } from '../helpers'
import { BlockComponent } from '../components/BlockComponent'
import { ReportFormComponent } from '../components/ReportFormComponent'
// import { makeStyles } from '@mui/styles'
// import { Theme } from '@mui/material'

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
    application_short_name: string
}

// const useStyles = makeStyles((theme: Theme) => ({
//     fontStyles: {
//         color: theme.palette.mode === 'dark' ? '#e8e6e3' : 'black',
//     },
// }))

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
    application_short_name,
}) => {
    const [useSecondaryReply, changeUseEditSecondary] = useState(false)
    const [useReplyEdit, changeUseReplyEdit] = useState(false)
    const [openReport, changeOpenReport] = useState(false)

    // const classes = useStyles()

    return (
        <Comment key={reply.id}>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
            <Comment.Content>
                <Comment.Author as="a">
                    {/* <span className={classes.fontStyles}> */}
                    <span style={{ color: '#969696' }}>
                        {reply.author.username}
                    </span>
                </Comment.Author>
                <Comment.Metadata>
                    {/* <span className={classes.fontStyles}> */}
                    <span style={{ color: '#969696' }}>
                        {displayModerator(reply.author.id) ? 'Mod' : ''}
                    </span>
                </Comment.Metadata>
                <Comment.Metadata>
                    {/* <ArrowLeft className={classes.fontStyles} /> */}
                    <ArrowLeft />
                    <span style={{ color: '#969696' }}>
                        {/* <span className={classes.fontStyles}> */}
                        Replied To {reply.replied_to_user?.username}
                    </span>
                </Comment.Metadata>
                <Comment.Metadata>
                    <span style={{ color: '#969696' }}>
                        {/* <span className={classes.fontStyles}> */}
                        <Moment format="DD/MM/YYYY">{reply.created_at}</Moment>
                    </span>
                </Comment.Metadata>
                {reply.edited === true ? (
                    <Comment.Metadata>
                        {/* <span className={classes.fontStyles}> */}
                        <span style={{ color: '#969696' }}>
                            Edited:
                            <Moment format="DD/MM/YYYY">
                                {comment.updated_at}
                            </Moment>
                        </span>
                    </Comment.Metadata>
                ) : (
                    ''
                )}
                {currentUser &&
                currentUser.current_user.id !== reply.author.id ? (
                    <Comment.Metadata>
                        <BlockComponent
                            changeOpenReport={changeOpenReport}
                            comment_author_id={reply.author.id}
                        />
                    </Comment.Metadata>
                ) : (
                    ''
                )}
                <Comment.Text>
                    {useReplyEdit ? (
                        <EditCommentForm
                            application_short_name={application_short_name}
                            currentSort={currentSort}
                            application_id={comment.application_id}
                            website_url={website_url}
                            thread_id={thread_id}
                            limit={limit}
                            skip={skip}
                            title={title}
                            comment={reply}
                            changeUseReplyEdit={changeUseReplyEdit}
                            changeUseEdit={changeUseEdit}
                        />
                    ) : (
                        <>
                            {reply.pending ? (
                                'Comment waiting for approval'
                            ) : (
                                <div
                                    // className={classes.fontStyles}
                                    style={{ color: '#969696' }}
                                    dangerouslySetInnerHTML={{
                                        __html: displayHtml(reply),
                                    }}
                                />
                            )}
                        </>
                    )}
                </Comment.Text>
                <Comment.Actions>
                    <Ratings comment={reply} />
                    <Comment.Action
                        onClick={() =>
                            changeUseEditSecondary(!useSecondaryReply)
                        }
                    >
                        {/* <span className={classes.fontStyles}>Reply</span> */}
                        <span style={{ color: '#969696' }}>Reply</span>
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
                                <span style={{ color: '#969696' }}>Edit</span>
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
                                <span style={{ color: '#969696' }}>delete</span>
                            </Comment.Action>
                        </>
                    ) : (
                        ''
                    )}
                </Comment.Actions>
                {useSecondaryReply ? (
                    <ReplyCommentForm
                        application_short_name={application_short_name}
                        currentSort={currentSort}
                        limit={limit}
                        skip={skip}
                        comment={reply}
                        replied_to_id={reply.author.id}
                        changeUseMain={changeUseEditSecondary}
                        parent_id={comment.id}
                    />
                ) : (
                    ''
                )}
                {openReport ? (
                    <ReportFormComponent
                        comment_id={reply.id}
                        changeOpenReport={changeOpenReport}
                    />
                ) : (
                    ''
                )}
            </Comment.Content>
        </Comment>
    )
}
