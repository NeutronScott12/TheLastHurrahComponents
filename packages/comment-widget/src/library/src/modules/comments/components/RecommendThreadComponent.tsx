import React from 'react'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import {
    useIsUserSubscribedToThreadQuery,
    useToggleSubscriptionToThreadMutation,
} from '../../../generated/graphql'
import { Button, useTheme } from '@mui/material'

interface IRecommendThreadComponent {
    thread_id: string
}

export const RecommendThreadComponent: React.FC<IRecommendThreadComponent> = ({
    thread_id,
}) => {
    const { loading, data, refetch } = useIsUserSubscribedToThreadQuery({
        variables: {
            isUserSubscribedToThreadInput: {
                thread_id,
            },
        },
    })
    const [toggleSubscription] = useToggleSubscriptionToThreadMutation()

    const theme = useTheme()

    const toggleSubscriptionToThread = async () => {
        try {
            const response = await toggleSubscription({
                variables: { toggleSubscriptionToThreadInput: { thread_id } },
            })

            if (response.data?.toggle_subscription_to_thread.success) {
                await refetch()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return loading ? (
        <>''</>
    ) : (
        <div>
            {data?.is_user_subscribed_to_thread.success ? (
                <Button onClick={toggleSubscriptionToThread}>
                    <StarOutlinedIcon
                        style={{
                            color:
                                theme.palette.mode === 'dark'
                                    ? 'white'
                                    : 'black',
                        }}
                    />
                </Button>
            ) : (
                <Button
                    style={{
                        color:
                            theme.palette.mode === 'dark' ? 'white' : 'black',
                    }}
                    onClick={toggleSubscriptionToThread}
                >
                    <StarOutlineOutlinedIcon
                        style={{
                            color:
                                theme.palette.mode === 'dark'
                                    ? 'white'
                                    : 'black',
                        }}
                    />
                </Button>
            )}
        </div>
    )
}
