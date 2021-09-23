import React from 'react'
import { CircularProgress, Grid } from '@material-ui/core'

export const Loader = () => (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
    >
        <CircularProgress />
    </Grid>
)
