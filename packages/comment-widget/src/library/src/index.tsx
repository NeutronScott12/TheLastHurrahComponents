import React, { useMemo, useState } from 'react'
import { ApolloProvider } from '@apollo/client'

import 'semantic-ui-css/semantic.min.css'

import { CommentContainer } from './modules/comments'
import { client } from './apollo'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline, PaletteMode, useTheme } from '@mui/material'
import { deepmerge } from '@mui/utils'

export interface IBinaryStashCommentComponentProps {
    title: string
    website_url: string
    application_id: string
    application_name: string
    dark_theme: boolean
    innerComponent: boolean
}

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {},
})

export const BinaryStashCommentComponent: React.FC<IBinaryStashCommentComponentProps> =
    (props) => {
        let theme
        const outTheme = useTheme()
        console.log('OUTER_THEME', outTheme)
        const siteTheme = props.dark_theme === true ? 'dark' : 'light'

        const [mode, setMode] = useState<PaletteMode>(siteTheme)

        console.log('MODE', mode)
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

        console.log('BETTER', colorMode)

        const innerTheme = useMemo(
            () =>
                createTheme({
                    palette: {
                        mode,
                    },
                }),
            [mode],
        )

        if (outTheme !== undefined) {
            theme = createTheme(deepmerge(outTheme, innerTheme))
            console.log('MERGED_THEME', theme)
        } else {
            theme = innerTheme
        }

        console.log('THEME', theme)

        if (props.innerComponent) {
            console.log('INNER_LOAD_IN')
            return (
                <ApolloProvider client={client}>
                    <CssBaseline />
                    <CommentContainer {...props} />
                </ApolloProvider>
            )
        }

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
