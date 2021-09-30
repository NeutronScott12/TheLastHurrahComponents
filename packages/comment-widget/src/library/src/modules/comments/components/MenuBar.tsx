import React, { useState } from 'react'
import { Toolbar } from '@material-ui/core'
import { AppBar, Button, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { cache, IS_LOGGED_IN } from '../../../apollo/cache'

export const MenuBar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const logOut = () => {
        handleClose()
        cache.writeQuery({
            query: IS_LOGGED_IN,
            data: {
                isLoggedIn: false,
            },
        })
        localStorage.removeItem('binary-stash-token')
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Button
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                        fontSize: '4rem',
                    }}
                >
                    <MenuIcon />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={logOut}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}
