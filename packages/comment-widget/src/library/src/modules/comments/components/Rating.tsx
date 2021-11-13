import React from 'react'
import { Comment } from 'semantic-ui-react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import { IComment } from './Comment'
import {
    useDownVoteCommentMutation,
    useUpVoteCommentMutation,
} from '../../../generated/graphql'
import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

interface IRatings {
    comment: IComment
}

const useStyles = makeStyles((theme: Theme) => ({
    fontStyles: {
        color: theme.palette.mode === 'dark' ? '#e8e6e3' : 'black',
    },
}))

export const Ratings: React.FC<IRatings> = ({ comment }) => {
    const [upVoteComment] = useUpVoteCommentMutation()
    const [downVoteComment] = useDownVoteCommentMutation()
    // const classes = useStyles()

    const upVote = async () => {
        try {
            await upVoteComment({ variables: { comment_id: comment.id } })
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
            }
        }
    }

    const downVote = async () => {
        try {
            await downVoteComment({ variables: { comment_id: comment.id } })
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <Comment.Action onClick={upVote}>
                {/* <ArrowUpwardIcon className={classes.fontStyles} />{' '} */}
                <ArrowUpwardIcon style={{ color: '#969696' }} />{' '}
                {/* <span className={classes.fontStyles}> */}
                <span style={{ color: '#969696' }}>
                    {comment._count.up_vote}
                </span>
            </Comment.Action>
            <Comment.Action onClick={downVote}>
                {/* <ArrowDownwardIcon className={classes.fontStyles} />{' '} */}
                <ArrowDownwardIcon style={{ color: '#969696' }} />{' '}
                {/* <span className={classes.fontStyles}> */}
                <span style={{ color: '#969696' }}>
                    {comment._count.down_vote}
                </span>
            </Comment.Action>
        </>
    )
}
