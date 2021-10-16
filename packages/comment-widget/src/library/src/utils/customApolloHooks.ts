import { QueryHookOptions, useQuery } from '@apollo/client'
import { CURRENT_USER_CLIENT, IS_LOGGED_IN } from '../apollo/cache'
import { ICurrentUserClient, ILoggedIn } from '../types'

export const useIsLoggedIn = (baseOptions?: QueryHookOptions) =>
    useQuery<ILoggedIn>(IS_LOGGED_IN, baseOptions)

export const useCurrentUserClient = (baseOptions?: QueryHookOptions) =>
    useQuery<ICurrentUserClient>(CURRENT_USER_CLIENT, baseOptions)
