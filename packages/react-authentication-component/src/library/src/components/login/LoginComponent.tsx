import React, { useState } from 'react'
import { useFormik } from 'formik'
import { CHANGE_FORM_DISPLAY } from '../../AuthenticationContainer'
import { useBinaryMutations } from '../../common/useBinaryMutations'
import { LoginValidationSchema } from '../../common/validations/form_validation'
import { LoginView } from './views/LoginView'
import { TwoFactorLogin } from '../two_factor_login/TwoFactorLogin'
import { values } from 'ramda'
import { Alert } from '@mui/material'

interface ILoginContainer {
    changeDisplay: React.Dispatch<React.SetStateAction<CHANGE_FORM_DISPLAY>>
    logInCallback: () => void
}

export interface ILoginFormValues {
    username: string
    email: string
    password: string
}

export const LoginContainer: React.FC<ILoginContainer> = ({
    changeDisplay,
    logInCallback,
}) => {
    const client = useBinaryMutations()
    const [two_factor, change_two_factor] = useState(false)
    const [savedEmail, changeEmail] = useState('')
    const [checkError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const formik = useFormik<ILoginFormValues>({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: LoginValidationSchema,
        onSubmit: async ({ email, password }, { setSubmitting }) => {
            console.log(email, password)
            try {
                const result = await client.login({
                    email,
                    password,
                })
                console.log('RESULT', result)

                if (result.data.login_user.two_factor_authentication) {
                    changeEmail(savedEmail)
                    change_two_factor(true)
                    console.log(savedEmail, two_factor)
                }

                setSubmitting(false)
            } catch (error: unknown) {
                console.log(error)
                if (error instanceof Error) {
                    setErrorMessage(error.message)
                    setError(true)
                }
                throw new Error('Something went wrong')
            }
        },
    })

    return (
        <div>
            {two_factor === false ? (
                <div>
                    {checkError ? (
                        <Alert severity="error">{errorMessage}</Alert>
                    ) : (
                        ''
                    )}
                    <br />
                    <LoginView {...formik} />
                </div>
            ) : (
                <TwoFactorLogin
                    email={formik.values.email}
                    logInCallback={logInCallback}
                />
            )}

            <div>
                <p
                    style={{ cursor: 'grab' }}
                    onClick={() =>
                        changeDisplay(CHANGE_FORM_DISPLAY.FORGOT_PASSWORD)
                    }
                >
                    Forgot Password
                </p>
                <p
                    style={{ cursor: 'grab' }}
                    onClick={() =>
                        changeDisplay(CHANGE_FORM_DISPLAY.REGISTRATION)
                    }
                >
                    Don't have an account? Register.
                </p>
            </div>
        </div>
    )
}
