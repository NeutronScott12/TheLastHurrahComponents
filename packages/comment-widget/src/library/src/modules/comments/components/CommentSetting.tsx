import React from 'react'
import { Switch, useTheme } from '@mui/material'
import { useChangeCommentSettingsMutation } from '../../../generated/graphql'

interface ICommentSettings {
    comment_id: string
    reply_notification: boolean
}

export const NotificationReplySettings: React.FC<ICommentSettings> = ({
    comment_id,
    reply_notification,
}) => {
    const [changeCommentSettings] = useChangeCommentSettingsMutation()
    const theme = useTheme()

    const handleChange = async (checked: boolean) => {
        try {
            // console.log('CHECKED', checked)
            await changeCommentSettings({
                variables: {
                    changeCommentSettingsInput: {
                        comment_id,
                        reply_notification: checked,
                    },
                },
            })
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
                // setError(true)
                // setErrorMessage(error.message)
            }
        }
    }

    // console.log('REPLY_NOTIFICATION', reply_notification)

    return (
        <div>
            <Switch
                onChange={(data, checked) => handleChange(checked)}
                name="reply_notification"
                id="reply_notification"
                defaultChecked={reply_notification}
                size="small"
                style={{
                    color: theme.palette.mode === 'dark' ? '#e8e6e3' : 'black',
                }}
            />
        </div>
    )
}
