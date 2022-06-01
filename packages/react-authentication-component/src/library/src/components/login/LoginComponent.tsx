import React from 'react'
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { AuthenticationAPI } from '@thelasthurrah/authentication_api'
import { CHANGE_FORM_DISPLAY } from '../../AuthenticationContainer'

interface ILoginContainer {
    changeDisplay: React.Dispatch<React.SetStateAction<CHANGE_FORM_DISPLAY>>
    logInCallback: () => void
}

export const LoginContainer: React.FC<ILoginContainer> = ({
    changeDisplay,
}) => {
    const {
        handleSubmit,
        handleChange,
        errors,
        values,
        touched,
        isSubmitting,
        dirty,
    } = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        // validationSchema: {},
        onSubmit: async ({ email, password }, { setSubmitting }) => {
            console.log(email, password)

            const authenticationAPI = new AuthenticationAPI(
                'http://localhost:4000/graphql',
                'first-application',
            )

            const result = await authenticationAPI.mutations.login({
                email,
                password,
            })

            console.log('RESULT', result)

            setSubmitting(false)
        },
    })

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
            />
            <TextField
                autoComplete="off"
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
            />
            <Button
                disabled={isSubmitting || dirty === false}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
            >
                Submit
            </Button>
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
        </form>
    )
}
