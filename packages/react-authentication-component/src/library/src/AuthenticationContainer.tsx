import React, { useEffect, useState } from 'react'
import { AuthenticationAPI } from '@thelasthurrah/authentication_api'

import { BinaryStashProvider } from './common/BinaryStashProvider'
import { RegisterContainer } from './components/register/RegisterComponent'
import { LoginContainer } from './components/login/LoginComponent'

interface IAutheticationContainer {
    children?: React.ReactNode
    logInCallback: () => void
    application_id: string
}

export enum CHANGE_FORM_DISPLAY {
    LOGIN,
    REGISTRATION,
    FORGOT_PASSWORD,
}

const client = new AuthenticationAPI(
    'http://localhost:4000/graphql',
    'first-application',
)

export const AuthenticationContainer: React.FC<IAutheticationContainer> = ({
    logInCallback,
    application_id,
}) => {
    const [showDisplay, changeDisplay] = useState(CHANGE_FORM_DISPLAY.LOGIN)

    const Display = () => {
        switch (showDisplay) {
            case CHANGE_FORM_DISPLAY.LOGIN:
                return (
                    <LoginContainer
                        logInCallback={logInCallback}
                        changeDisplay={changeDisplay}
                    />
                )
            case CHANGE_FORM_DISPLAY.REGISTRATION:
                return (
                    <RegisterContainer
                        application_id={application_id}
                        changeDisplay={changeDisplay}
                    />
                )
            // case CHANGE_FORM_DISPLAY.FORGOT_PASSWORD:
            // 	return <ForgotPassword changeDisplay={changeDisplay} />
            default:
                return (
                    <LoginContainer
                        logInCallback={logInCallback}
                        changeDisplay={changeDisplay}
                    />
                )
        }
    }

    // useEffect(() => {
    //     const loginAttempt = async () => {
    //         console.log(
    //             'CLIENT',
    //             await client.mutations.login({
    //                 email: 'scottberry91@gmail.com',
    //                 password: 'scott',
    //             }),
    //         )
    //     }

    //     loginAttempt()
    // }, [])

    return (
        <div>
            <h1>Authentication Container</h1>
            <BinaryStashProvider client={client}>
                <Display />
            </BinaryStashProvider>
        </div>
    )
}
