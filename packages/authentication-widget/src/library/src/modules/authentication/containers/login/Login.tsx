import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import { Alert } from '@material-ui/lab'

import { CHANGE_FORM_DISPLAY } from '../../../../entities/enums'
import { LoginValidationSchema } from '../../../validation'
import { ILogin } from './types'
import { useLoginMutation } from '../../../../generated/graphql'

export const Login: React.FC<ILogin> = ({ changeDisplay, logInCallback }) => {
	const [loginMutation] = useLoginMutation()
	const [checkError, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: LoginValidationSchema,
		async onSubmit({ email, password }, { setSubmitting }) {
			try {
				const response = await loginMutation({
					variables: {
						loginInput: {
							email,
							password,
						},
					},
				})

				console.log(response)

				if (response.data && response.data.login_user) {
					logInCallback(response.data?.login_user)
				} else {
					throw new Error('Something went wrong, please try again')
				}

				setSubmitting(false)
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

	const changeToForgotPassword = () => changeDisplay(CHANGE_FORM_DISPLAY.FORGOT_PASSWORD)

	return (
		<div>
			<h2>Login</h2>
			{checkError ? <Alert severity="error">{errorMessage}</Alert> : ''}
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
				<Button color="primary" variant="contained" fullWidth type="submit">
					Submit
				</Button>
				<div>
					<p style={{ cursor: 'grab' }} onClick={changeToForgotPassword}>
						Forgot Password
					</p>
					<p style={{ cursor: 'grab' }} onClick={changeToRegistration}>
						Don't have an account? Sign Up
					</p>
				</div>
			</form>
		</div>
	)
}
