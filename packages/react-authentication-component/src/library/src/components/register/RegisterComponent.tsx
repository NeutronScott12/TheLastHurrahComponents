import React from 'react'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import { CHANGE_FORM_DISPLAY } from '../../AuthenticationContainer'

interface IRegisterFormInitialValues {
    username: string
    email: string
    password: string
    repeat_password: string
}

interface IRegisterContainer {
    changeDisplay: React.Dispatch<React.SetStateAction<CHANGE_FORM_DISPLAY>>
    application_id: string
}

export const RegisterContainer: React.FC<IRegisterContainer> = ({
    changeDisplay,
}) => {
    const {
        handleChange,
        handleSubmit,
        values,
        touched,
        errors,
        isSubmitting,
        dirty,
    } = useFormik<IRegisterFormInitialValues>({
        initialValues: {
            username: '',
            email: '',
            password: '',
            repeat_password: '',
        },
        async onSubmit(values) {
            console.log(values)
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
            <TextField
                autoComplete="off"
                fullWidth
                id="repeat_password"
                name="repeat_password"
                label="Repeat Password"
                type="repeat_password"
                value={values.repeat_password}
                onChange={handleChange}
                error={
                    touched.repeat_password && Boolean(errors.repeat_password)
                }
                helperText={touched.repeat_password && errors.repeat_password}
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
                    onClick={() => changeDisplay(CHANGE_FORM_DISPLAY.LOGIN)}
                >
                    Already have an account? Login.
                </p>
            </div>
        </form>
    )
}
