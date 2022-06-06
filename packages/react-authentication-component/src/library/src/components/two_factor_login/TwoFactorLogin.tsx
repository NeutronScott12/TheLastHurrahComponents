import React, { useState } from 'react'
import { Alert, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'

import { useBinaryMutations } from '../../common/useBinaryMutations'
import { TwoFactorValidationSchema } from '../../common/validations/form_validation'

interface ITwoFactorLogin {
    email: string
    logInCallback: () => void
}

export const TwoFactorLogin: React.FC<ITwoFactorLogin> = ({
    email,
    logInCallback,
}) => {
    const client = useBinaryMutations()
    const [checkError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const {
        handleSubmit,
        handleChange,
        values,
        errors,
        dirty,
        isSubmitting,
        touched,
    } = useFormik({
        initialValues: {
            two_factor_id: '',
        },
        validationSchema: TwoFactorValidationSchema,
        async onSubmit(values) {
            console.log(values, email)
            try {
                const result = await client.two_factor_login({
                    email,
                    two_factor_id: values.two_factor_id,
                })

                console.log('RESULT: ', result)
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
            {checkError ? <Alert severity="error">{errorMessage}</Alert> : ''}
            <br />
            <form onSubmit={handleSubmit}>
                <h1>Two Factor Login</h1>
                <TextField
                    autoComplete="off"
                    fullWidth
                    id="two_factor_id"
                    name="two_factor_id"
                    label="Code"
                    type="two_factor_id"
                    value={values.two_factor_id}
                    onChange={handleChange}
                    error={
                        touched.two_factor_id && Boolean(errors.two_factor_id)
                    }
                    helperText={touched.two_factor_id && errors.two_factor_id}
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
            </form>
        </div>
    )
}
