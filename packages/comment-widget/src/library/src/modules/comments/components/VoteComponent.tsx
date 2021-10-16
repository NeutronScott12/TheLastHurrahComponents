import React from 'react'

import {
    Exact,
    FindThreadByIdInput,
    FindThreadByIdQuery,
    useClosePollMutation,
    useDeletePollMutation,
    useUpdatePollVoteMutation,
} from '../../../generated/graphql'
import { ApolloQueryResult } from '@apollo/client'
import { VoteView } from '../views/VoteView'
import { IPollEntity } from '../types'

interface IVoteComponent {
    thread_id: string
    poll: IPollEntity
    refetch: (
        variables?:
            | Partial<
                  Exact<{
                      findThreadById: FindThreadByIdInput
                  }>
              >
            | undefined,
    ) => Promise<ApolloQueryResult<FindThreadByIdQuery>>
}

export const VoteComponent: React.FC<IVoteComponent> = ({
    poll,
    refetch,
    thread_id,
}) => {
    const [updateVote] = useUpdatePollVoteMutation()
    const [deletePollMutation] = useDeletePollMutation()
    const [closePollMutation] = useClosePollMutation()

    const increaseVote = async (options_id: string) => {
        try {
            await updateVote({
                variables: {
                    updatePollVoteInput: { options_id, poll_id: poll.id },
                },
            })
            await refetch()
        } catch (error) {
            if (error instanceof Error) {
                // console.log(error)
                // setError(true)
                // setErrorMessage(error.message)
            }
        }
    }

    const deletePoll = async () => {
        try {
            await deletePollMutation({
                variables: {
                    deletePollInput: {
                        poll_id: poll.id,
                        thread_id,
                    },
                },
            })
            await refetch()
        } catch (error) {
            if (error instanceof Error) {
                // console.log(error)
                // setError(true)
                // setErrorMessage(error.message)
            }
        }
    }

    const closePoll = async (poll_id: string) => {
        try {
            await closePollMutation({
                variables: { closePollInput: { poll_id } },
            })
        } catch (error) {
            if (error instanceof Error) {
                // console.log(error)
                // setError(true)
                // setErrorMessage(error.message)
            }
        }
    }

    return (
        <VoteView
            poll={poll}
            deletePoll={deletePoll}
            increaseVote={increaseVote}
            closePoll={closePoll}
        />
    )
}
