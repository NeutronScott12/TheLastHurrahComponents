import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Alert, Button, Checkbox, FormControlLabel, TextField } from '@mui/material'

import { CHANGE_FORM_DISPLAY } from '../../../../entities/enums'
import { RegistrationValidationSchema } from '../../../validation'
import { IRegistration } from './types'
import { useRegistrationMutation } from '../../../../generated/graphql'

export const Registration: React.FC<IRegistration> = ({ changeDisplay, application_id }) => {
	const [registrationMutation] = useRegistrationMutation()
	const [checkError, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [checkSuccess, setSuccess] = useState(false)
	const [successMessage, setSuccessMessage] = useState('')
	const formik = useFormik({
		initialValues: {
			email: '',
			username: '',
			password: '',
			repeat_password: '',
			two_factor_authentication: false,
		},
		validationSchema: RegistrationValidationSchema,
		async onSubmit(
			{ email, username, password, two_factor_authentication },
			{ setSubmitting }
		) {
			try {
				const response = await registrationMutation({
					variables: {
						registrationInput: {
							email,
							password,
							username,
							two_factor_authentication,
							application_id,
						},
					},
				})

				if (response.data?.register_user.success) {
					setSubmitting(false)
					setSuccess(true)
					setSuccessMessage(response.data.register_user.message)
				}
			} catch (error) {
				if (error instanceof Error) {
					console.log(error.message)
					setError(true)
					setErrorMessage('something went wrong')
				}
			}
		},
	})

	const changeToLogin = () => {
		changeDisplay(CHANGE_FORM_DISPLAY.LOGIN)
	}

	return (
		<div>
			<h2>Registration</h2>
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
				<TextField
					fullWidth
					id="username"
					name="username"
					label="Username"
					value={formik.values.username}
					onChange={formik.handleChange}
					error={formik.touched.username && Boolean(formik.errors.username)}
					helperText={formik.touched.username && formik.errors.username}
				/>
				<TextField
					autoComplete="off"
					fullWidth
					id="password"
					name="password"
					label="Password"
					type="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
				/>
				<TextField
					autoComplete="off"
					fullWidth
					id="repeat_password"
					name="repeat_password"
					label="Repeat Password"
					type="password"
					value={formik.values.repeat_password}
					onChange={formik.handleChange}
					error={formik.touched.repeat_password && Boolean(formik.errors.repeat_password)}
					helperText={formik.touched.repeat_password && formik.errors.repeat_password}
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={formik.values.two_factor_authentication}
							onChange={formik.handleChange}
							name="two_factor_authentication"
						/>
					}
					label="Two Factor"
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
						Already have an account? Login
					</p>
				</div>
			</form>
		</div>
	)
}
