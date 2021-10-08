import React, { useState } from 'react'
import { useBlockUserMutation } from '../../../generated/graphql'
import { CommentActionDropdown } from '../views/CommentActionDropdown'

interface IBlockComponent {
    comment_author_id: string
    changeOpenReport: React.Dispatch<React.SetStateAction<boolean>>
}

export const BlockComponent: React.FC<IBlockComponent> = ({
    comment_author_id,
    changeOpenReport,
}) => {
    const [anchourEl, setAnchourEl] = useState<null | HTMLElement>(null)
    const [blockUser] = useBlockUserMutation()
    const open = Boolean(anchourEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchourEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchourEl(null)
    }

    const block_user = async (user_id: string) => {
        try {
            await blockUser({ variables: { user_id: comment_author_id } })
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
                // setError(true)
                // setErrorMessage(error.message)
            }
        }
    }

    return (
        <CommentActionDropdown
            changeOpenReport={changeOpenReport}
            open={open}
            anchourEl={anchourEl}
            handleClick={handleClick}
            handleClose={handleClose}
            block_user={block_user}
            comment_author_id={comment_author_id}
        />
    )
}
