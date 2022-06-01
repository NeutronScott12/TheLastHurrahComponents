import React, { useState } from 'react'
import { LoginContainer } from './components/login/LoginComponent'
import { RegisterContainer } from './components/register/RegisterComponent'

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

    return (
        <div>
            <h1>Authentication Container</h1>
            <Display />
        </div>
    )
}
