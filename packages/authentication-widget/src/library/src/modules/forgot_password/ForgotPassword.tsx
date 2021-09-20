import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Button, Grid, TextField } from '@material-ui/core'
import request from 'graphql-request'

import { CHANGE_FORM_DISPLAY } from '../../entities/enums'
import { Alert } from '@material-ui/lab'
import { GRAPHQL_ENDPOINT } from '../../constants'
import { forgotPasswordValidationSchema } from '../validation'
import { FORGOT_PASSWORD } from './graphql'
import { IForgotPassword, IForgotPasswordResponse } from './types'

export const ForgotPassword: React.FC<IForgotPassword> = ({ changeDisplay }) => {
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
				const response = await request<IForgotPasswordResponse>(
					GRAPHQL_ENDPOINT,
					FORGOT_PASSWORD,
					{ email }
				)

				if (response.forgot_password.success) {
					setSubmitting(false)
					setSuccess(true)
					setSuccessMessage(response.forgot_password.message)
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
		<Grid item xs={3}>
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
				<Button color="primary" variant="contained" fullWidth type="submit">
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
		</Grid>
	)
}
