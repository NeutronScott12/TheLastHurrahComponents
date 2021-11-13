import React from 'react'
import Moment from 'react-moment'
import { Comment } from 'semantic-ui-react'
import PushPinIcon from '@mui/icons-material/PushPin'

import { displayHtml } from '../helpers'
import { IPinnedComment } from '../types'

interface IPinnedCommentView {
    comment: IPinnedComment
}

export const PinnedCommentView: React.FC<IPinnedCommentView> = ({
    comment,
}) => {
    return (
        <Comment.Group style={{ background: 'grey' }} size="huge">
            <Comment>
                <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                <Comment.Content>
                    <Comment.Author as="a">
                        <span style={{ color: '#969696' }}>
                            {comment.author.username}
                        </span>
                    </Comment.Author>
                    <Comment.Metadata>
                        <PushPinIcon />
                    </Comment.Metadata>
                    <Comment.Metadata>
                        <span style={{ color: '#969696' }}>
                            <Moment format="DD/MM/YYYY">
                                {comment.created_at}
                            </Moment>
                        </span>
                    </Comment.Metadata>
                    <Comment.Text>
                        <div
                            style={{ color: '#969696' }}
                            dangerouslySetInnerHTML={{
                                __html: displayHtml(comment),
                            }}
                        />
                    </Comment.Text>
                </Comment.Content>
            </Comment>
        </Comment.Group>
    )
}
