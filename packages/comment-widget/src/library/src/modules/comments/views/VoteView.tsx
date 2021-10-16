import { Grid } from '@mui/material'
import React from 'react'
import { Button, List } from 'semantic-ui-react'
import { useCurrentUserClient } from '../../../utils/customApolloHooks'

import { IPollEntity } from '../types'

interface IVoteView {
    poll: IPollEntity
    deletePoll: () => void
    increaseVote: (option_id: string) => void
    closePoll: (poll_id: string) => void
}

export const VoteView: React.FC<IVoteView> = ({
    poll,
    deletePoll,
    increaseVote,
    closePoll,
}) => {
    const { data } = useCurrentUserClient()

    return (
        <Grid>
            <h2>{poll.title}</h2>
            {data && data.isModerator === true ? (
                <>
                    {poll.closed ? (
                        ''
                    ) : (
                        <Button onClick={() => closePoll(poll.id)}>
                            Close Poll
                        </Button>
                    )}

                    <Button onClick={() => deletePoll()}>Delete Poll</Button>
                </>
            ) : (
                ''
            )}

            <List divided verticalAlign="middle">
                {poll.options.map((option) => {
                    return (
                        <List.Item key={option.id}>
                            {poll.closed === false ? (
                                <List.Content floated="right">
                                    <Button
                                        onClick={() => increaseVote(option.id)}
                                    >
                                        Vote
                                    </Button>
                                </List.Content>
                            ) : (
                                ''
                            )}

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
