import React from 'react'
import { Grid } from '@mui/material'
import { Button, List } from 'semantic-ui-react'

import {
    Exact,
    FindThreadByIdInput,
    FindThreadByIdQuery,
    OptionEntity,
    Scalars,
    useDeletePollMutation,
    useUpdatePollVoteMutation,
} from '../../../generated/graphql'
import { ApolloQueryResult } from '@apollo/client'

interface IVoteComponent {
    thread_id: string
    poll: {
        __typename?: 'PollEntity'
        created_at: Scalars['DateTime']
        id: Scalars['String']
        options: Array<OptionEntity>
        title: Scalars['String']
    }
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

    return (
        <Grid>
            <h2>{poll.title}</h2>
            <Button onClick={() => deletePoll()}>Delete Poll</Button>
            <List divided verticalAlign="middle">
                {poll.options.map((option) => {
                    return (
                        <List.Item>
                            <List.Content floated="right">
                                <Button onClick={() => increaseVote(option.id)}>
                                    Vote
                                </Button>
                            </List.Content>
                            <List.Content>
                                <h3>{option.option}</h3>
                            </List.Content>
                            <List.Content>
                                <h3>{option.votes.length}</h3>
                            </List.Content>
                        </List.Item>
                    )
                })}
            </List>
        </Grid>
    )
}
