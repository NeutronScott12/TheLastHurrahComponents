import React, { useMemo, useState } from 'react'
import { ApolloProvider } from '@apollo/client'

import 'semantic-ui-css/semantic.min.css'

import { CommentContainer } from './modules/comments'
import { client } from './apollo'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

export interface IBinaryStashCommentComponentProps {
    title: string
    website_url: string
    application_id: string
    application_name: string
    dark_theme: boolean
}

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {},
})

export const BinaryStashCommentComponent: React.FC<IBinaryStashCommentComponentProps> =
    (props) => {
        const [mode, setMode] = useState(
            props.dark_theme === true ? 'dark' : 'light',
        )
        const colorMode = useMemo(
            () => ({
                toggleColorMode: () => {
                    setMode((prevMode) =>
                        prevMode === 'light' ? 'dark' : 'light',
                    )
                },
            }),
            [],
        )

        const theme = useMemo(
            () =>
                createTheme({
                    palette: {
                        //@ts-ignore
                        mode,
                    },
                }),
            [mode],
        )

        return (
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <ApolloProvider client={client}>
                        <CssBaseline />
                        <CommentContainer {...props} />
                    </ApolloProvider>
                </ThemeProvider>
            </ColorModeContext.Provider>
        )
    }
