import { QueryHookOptions, useQuery } from '@apollo/client'
import { IS_LOGGED_IN } from '../apollo/cache'
import { ILoggedIn } from '../types'

export const useCurrentUser = (baseOptions?: QueryHookOptions) =>
    useQuery<ILoggedIn>(IS_LOGGED_IN, baseOptions)
