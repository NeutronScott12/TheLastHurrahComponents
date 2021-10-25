import React, { useState } from 'react'
import { useFormik } from 'formik'

import { CHANGE_FORM_DISPLAY } from '../../../../entities/enums'
import { forgotPasswordValidationSchema } from '../../../validation'
import { IForgotPassword } from './types'
import { useForgotPasswordMutation } from '../../../../generated/graphql'
import { Alert, Button, TextField } from '@mui/material'

export const ForgotPassword: React.FC<IForgotPassword> = ({ changeDisplay }) => {
	const [forgotPassword] = useForgotPasswordMutation()
	const [checkError, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [checkSuccess, setSuccess] = useState(false)
	const [successMessage, setSuccessMessage] = useState('')

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: forgotPasswordValidationSchema,
		async onSubmit({ email }, { setSubmitting }) {
			try {
				const response = await forgotPassword({
					variables: { forgotPasswordInput: { email } },
				})

				if (response && response.data && response.data.forgot_password) {
					setSubmitting(false)
					setSuccess(true)
					setSuccessMessage(response.data.forgot_password.message)
				}
			} catch (error) {
				if (error instanceof Error) {
					console.log(error)
					setError(true)
					setErrorMessage('something went wrong')
				}
			}
		},
	})

	const changeToRegistration = () => changeDisplay(CHANGE_FORM_DISPLAY.REGISTRATION)

	const changeToLogin = () => changeDisplay(CHANGE_FORM_DISPLAY.LOGIN)

	return (
		<div>
			<h2>Forgot Password</h2>
			{checkError ? <Alert severity="error">{errorMessage}</Alert> : ''}
			{checkSuccess ? <Alert severity="success">{successMessage}</Alert> : ''}
			<form onSubmit={formik.handleSubmit}>
				<TextField
					fullWidth
					id="email"
					name="email"
					label="Email"
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>
				<Button
					disabled={formik.isSubmitting || formik.dirty === false}
					color="primary"
					variant="contained"
					fullWidth
					type="submit"
				>
					Submit
				</Button>
				<div>
					<p style={{ cursor: 'grab' }} onClick={changeToLogin}>
						Login
					</p>
					<p style={{ cursor: 'grab' }} onClick={changeToRegistration}>
						Don't have an account? Sign Up
					</p>
				</div>
			</form>
		</div>
	)
}
