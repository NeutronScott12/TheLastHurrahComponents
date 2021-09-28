import React, { useState } from 'react'
import { Comment } from 'semantic-ui-react'
import Moment from 'react-moment'

import { IComment } from '../components/Comment'
import { ReplyCommentForm } from '../components/ReplyCommentForm'
import { EditCommentForm } from '../components/EditComment'
import { ReplyCommentView } from './ReplyCommentView'
import { CurrentUserQuery } from '../../../generated/graphql'

interface ICommentViewProps {
    currentUser: CurrentUserQuery | undefined
    comment: IComment
    limit: number
    skip: number
    website_url: string
    title: string
    deleteComment: (id: string) => void
    deleteReplyComment: (id: string, parent_id: string) => void
}

export const CommentView: React.FC<ICommentViewProps> = ({
    comment,
    title,
    skip,
    limit,
    website_url,
    deleteComment,
    deleteReplyComment,
    currentUser,
}) => {
    const [useMain, changeUseMain] = useState(false)
    const [useEdit, changeUseEdit] = useState(false)
    const [_useReplyEdit, changeUseReplyEdit] = useState(false)

    console.log('CURRENT_USER', currentUser)
    console.log('COMMENT_AUTHOR_ID', comment.author.id)

    return (
        <Comment>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
            <Comment.Content>
                <Comment.Author as="a">
                    {comment.author.username}
                </Comment.Author>
                <Comment.Metadata>
                    <Moment format="DD/MM/YYYY">{comment.created_at}</Moment>
                </Comment.Metadata>
                <Comment.Text>
                    {useEdit ? (
                        <EditCommentForm
                            changeUseReplyEdit={changeUseReplyEdit}
                            comment_id={comment.id}
                            changeUseEdit={changeUseEdit}
                            comment_body={comment.body}
                        />
                    ) : (
                        comment.body
                    )}
                </Comment.Text>

                <Comment.Actions>
                    <Comment.Action onClick={() => changeUseMain(!useMain)}>
                        Reply
                    </Comment.Action>
                    {currentUser &&
                    currentUser.current_user.id === comment.author.id ? (
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
                        website_url={website_url}
                        limit={limit}
                        skip={skip}
                        title={title}
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
