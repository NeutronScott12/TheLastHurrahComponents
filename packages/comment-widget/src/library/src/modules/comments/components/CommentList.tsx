import React from 'react'
import { Comment } from 'semantic-ui-react'
import { useFetchCommentByThreadIdQuery } from '../../../generated/graphql'
import { CreateCommentForm } from './CreateCommentForm'

interface ICommentListProps {
    thread_id: string
}

export const CommentList: React.FC<ICommentListProps> = ({ thread_id }) => {
    const { loading, data } = useFetchCommentByThreadIdQuery({
        variables: {
            fetchCommentByThreadIdInput: { thread_id, skip: 0, limit: 10 },
        },
    })

    console.log('DATA', data)

    return loading ? (
        <div>Loading...</div>
    ) : (
        <div>
            <CreateCommentForm />
            <Comment.Group>
                {data?.fetch_comments_by_thread_id.map((comment) => {
                    return (
                        <Comment key={comment.id}>
                            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                            <Comment.Content>
                                <Comment.Author as="a">
                                    {comment.author.username}
                                </Comment.Author>
                                <Comment.Metadata>
                                    <div>{comment.created_at}</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.body}</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    )
                })}
                <Comment>
                    <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                    <Comment.Content>
                        <Comment.Author as="a">Matt</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                    <Comment.Group>
                        <Comment>
                            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
                            <Comment.Content>
                                <Comment.Author as="a">
                                    Jenny Hess
                                </Comment.Author>
                                <Comment.Metadata>
                                    <div>Just now</div>
                                </Comment.Metadata>
                                <Comment.Text>
                                    Elliot you are always so right :)
                                </Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </Comment>
            </Comment.Group>
        </div>
    )
}
