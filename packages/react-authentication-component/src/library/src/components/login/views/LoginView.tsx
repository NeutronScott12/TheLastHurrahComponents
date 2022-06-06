import React from 'react'
import { Button, TextField } from '@mui/material'
import { FormikErrors, FormikTouched } from 'formik'
import { ILoginFormValues } from '../LoginComponent'

interface ILoginView {
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
    handleChange: {
        (e: React.ChangeEvent<any>): void
        <T_1 = string | React.ChangeEvent<any>>(
            field: T_1,
        ): T_1 extends React.ChangeEvent<any>
            ? void
            : (e: string | React.ChangeEvent<any>) => void
    }
    errors: FormikErrors<ILoginFormValues>
    values: ILoginFormValues
    touched: FormikTouched<ILoginFormValues>
    isSubmitting: boolean
    dirty: boolean
}

export const LoginView: React.FC<ILoginView> = ({
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    isSubmitting,
    dirty,
}) => {
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
        </form>
    )
}
