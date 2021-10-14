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
                        {comment.author.username}
                    </Comment.Author>
                    <Comment.Metadata>
                        <PushPinIcon />
                    </Comment.Metadata>
                    <Comment.Metadata>
                        <Moment format="DD/MM/YYYY">
                            {comment.created_at}
                        </Moment>
                    </Comment.Metadata>
                    <Comment.Text>
                        <div
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
