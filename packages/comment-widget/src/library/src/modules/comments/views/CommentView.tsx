import React, { useState } from 'react'
import { Comment } from 'semantic-ui-react'
import Moment from 'react-moment'

import { IComment } from '../components/Comment'
import { ReplyCommentForm } from '../components/ReplyCommentForm'

interface ICommentViewProps {
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
}) => {
    const [useMain, changeUseMain] = useState(false)
    const [useSecondaryReply, changeUseEditSecondary] = useState(false)

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
                <Comment.Text>{comment.body}</Comment.Text>
                <Comment.Actions>
                    <Comment.Action onClick={() => changeUseMain(!useMain)}>
                        Reply
                    </Comment.Action>
                    <Comment.Action>Edit</Comment.Action>
                    <Comment.Action onClick={() => deleteComment(comment.id)}>
                        delete
                    </Comment.Action>
                </Comment.Actions>
                {useMain ? (
                    <ReplyCommentForm
                        website_url={website_url}
                        limit={limit}
                        skip={skip}
                        title={title}
                        comment={comment}
                        replied_to_id={comment.id}
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
                          <Comment key={reply.id}>
                              <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
                              <Comment.Content>
                                  <Comment.Author as="a">
                                      {reply.author.username}
                                  </Comment.Author>
                                  <Comment.Metadata>
                                      <Moment format="DD/MM/YYYY">
                                          {reply.created_at}
                                      </Moment>
                                  </Comment.Metadata>
                                  <Comment.Text>{reply.body}</Comment.Text>
                                  <Comment.Actions>
                                      <Comment.Action
                                          onClick={() =>
                                              changeUseEditSecondary(
                                                  !useSecondaryReply,
                                              )
                                          }
                                      >
                                          Reply
                                      </Comment.Action>
                                      <Comment.Action
                                          onClick={() =>
                                              deleteReplyComment(
                                                  reply.id,
                                                  reply.parent_id,
                                              )
                                          }
                                      >
                                          delete
                                      </Comment.Action>
                                  </Comment.Actions>
                                  {useSecondaryReply ? (
                                      <ReplyCommentForm
                                          website_url={website_url}
                                          limit={limit}
                                          skip={skip}
                                          title={title}
                                          comment={comment}
                                          replied_to_id={reply.id}
                                          changeUseMain={changeUseEditSecondary}
                                          parent_id={comment.id}
                                      />
                                  ) : (
                                      ''
                                  )}
                              </Comment.Content>
                          </Comment>
                      ))
                    : ''}
            </Comment.Group>
        </Comment>
    )
}
