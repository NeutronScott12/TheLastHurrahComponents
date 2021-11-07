import React from 'react'
import { IconButton, Menu, MenuItem, useTheme } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const ITEM_HEIGHT = 48

interface ICommentActionDropdown {
    comment_author_id: string
    open: boolean
    anchourEl: HTMLElement | null
    handleClick: (event: React.MouseEvent<HTMLElement>) => void
    handleClose: () => void
    block_user: (user_id: string) => Promise<void>
    changeOpenReport: React.Dispatch<React.SetStateAction<boolean>>
}

export const CommentActionDropdown: React.FC<ICommentActionDropdown> = ({
    comment_author_id,
    open,
    anchourEl,
    handleClick,
    handleClose,
    block_user,
    changeOpenReport,
}) => {
    const theme = useTheme()

    return (
        <span>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls="long-menu"
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon
                    style={{
                        color:
                            theme.palette.mode === 'dark' ? '#e8e6e3' : 'black',
                    }}
                />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{ 'aria-labelledby': 'long-button' }}
                anchorEl={anchourEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem
                    style={{
                        color:
                            theme.palette.mode === 'dark' ? '#e8e6e3' : 'black',
                    }}
                    onClick={() => block_user(comment_author_id)}
                >
                    Block User
                </MenuItem>
                <MenuItem
                    style={{
                        color:
                            theme.palette.mode === 'dark' ? '#e8e6e3' : 'black',
                    }}
                    onClick={() => {
                        changeOpenReport(true)
                        handleClose()
                    }}
                >
                    Report
                </MenuItem>
            </Menu>
        </span>
    )
}
