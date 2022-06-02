import React, { useContext } from 'react'
import {
    AuthenticationAPI,
    AuthenticationMutations,
} from '@thelasthurrah/authentication_api'
import {
    AuthenticationAPIProvider,
    IAuthenticationProvider,
} from './BinaryStashProvider'

export const useBinaryMutations = (): AuthenticationMutations => {
    const client = useContext(
        AuthenticationAPIProvider,
    ) as IAuthenticationProvider

    return client.mutations
}
