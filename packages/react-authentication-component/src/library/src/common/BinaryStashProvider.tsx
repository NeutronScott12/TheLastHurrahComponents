import React, { createContext, useEffect } from 'react'
import {
    AuthenticationAPI,
    AuthenticationMutations,
} from '@thelasthurrah/authentication_api'

interface IBinaryStashProvider {
    children?: React.ReactNode
    client: AuthenticationAPI
}

export interface IAuthenticationProvider {
    mutations: AuthenticationMutations
}

export const AuthenticationAPIProvider = createContext({})

export const BinaryStashProvider: React.FC<IBinaryStashProvider> = ({
    children,
    client,
}) => {
    return (
        <AuthenticationAPIProvider.Provider value={client}>
            {children}
        </AuthenticationAPIProvider.Provider>
    )
}
