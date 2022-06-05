import React from 'react'
import { useFormik } from 'formik'

import { CHANGE_FORM_DISPLAY } from '../../AuthenticationContainer'
import { Button, TextField } from '@mui/material'
import { forgotPasswordValidationSchema } from '../../common/validations/form_validation'
import { useBinaryMutations } from '../../common/useBinaryMutations'

interface IForgotPassword {
    changeDisplay: (display: CHANGE_FORM_DISPLAY) => void
}

export const ForgotPassword: React.FC<IForgotPassword> = ({
    changeDisplay,
}) => {
    const client = useBinaryMutations()

    const {
        values,
        handleChange,
        handleSubmit,
        errors,
        touched,
        isSubmitting,
        dirty,
    } = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: forgotPasswordValidationSchema,
        async onSubmit(values) {
            console.log(values)

            const result = await client.forgot_password({
                email: values.email,
                redirect_url: 'http://localhost:3600',
            })

            console.log('RESULT: ', result)
        },
    })

    return (
        <div>
            <h1>Forgot Password</h1>
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
                <Button
                    disabled={
                        isSubmitting ||
                        dirty === false ||
                        errors.email !== undefined
                    }
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                >
                    Submit
                </Button>
            </form>

            <div>
                <p
                    style={{ cursor: 'grab' }}
                    onClick={() => changeDisplay(CHANGE_FORM_DISPLAY.LOGIN)}
                >
                    Already have an account? Login.
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
