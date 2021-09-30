import React, { useEffect, useState } from 'react'
import { Comment } from 'semantic-ui-react'
import Moment from 'react-moment'

import { IComment } from '../components/Comment'
import { ReplyCommentForm } from '../components/ReplyCommentForm'
import { EditCommentForm } from '../components/EditComment'
import { ReplyCommentView } from './ReplyCommentView'
import { CurrentUserQuery } from '../../../generated/graphql'
import { Ratings } from '../components/Rating'

export interface IModerator {
    username: string
    id: string
}
interface ICommentViewProps {
    currentUser: CurrentUserQuery | undefined
    thread_id: string
    comment: IComment
    limit: number
    skip: number
    website_url: string
    title: string
    moderators: IModerator[] | undefined
    deleteComment: (id: string) => void
    deleteReplyComment: (id: string, parent_id: string) => void
}

export const CommentView: React.FC<ICommentViewProps> = ({
    thread_id,
    comment,
    title,
    skip,
    limit,
    website_url,
    currentUser,
    moderators,
    deleteComment,
    deleteReplyComment,
}) => {
    const [useMain, changeUseMain] = useState(false)
    const [useEdit, changeUseEdit] = useState(false)
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
                    {comment.author.username}
                </Comment.Author>
                <Comment.Metadata>
                    {displayModerator(comment.author.id) ? 'Mod' : ''}
                </Comment.Metadata>
                <Comment.Metadata>
                    <Moment format="DD/MM/YYYY">{comment.created_at}</Moment>
                </Comment.Metadata>
                <Comment.Text>
                    {useEdit ? (
                        <EditCommentForm
                            application_id={comment.application_id}
                            website_url={website_url}
                            thread_id={thread_id}
                            limit={limit}
                            skip={skip}
                            title={title}
                            // changeUseReplyEdit={changeUseReplyEdit}
                            comment_id={comment.id}
                            changeUseEdit={changeUseEdit}
                            comment_body={comment.body}
                        />
                    ) : (
                        comment.body
                    )}
                </Comment.Text>

                <Comment.Actions>
                    <Ratings comment={comment} />
                    <Comment.Action onClick={() => changeUseMain(!useMain)}>
                        Reply
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
                </Comment.Actions>
                {useMain ? (
                    <ReplyCommentForm
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
            </Comment.Content>
            <Comment.Group size="huge">
                {comment.replies
                    ? comment.replies.map((reply) => (
                          <ReplyCommentView
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
