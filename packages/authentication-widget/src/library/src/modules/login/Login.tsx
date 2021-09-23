import React, { useState } from 'react'
import { request } from 'graphql-request'
import { Button, Grid, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import { Alert } from '@material-ui/lab'

import { CHANGE_FORM_DISPLAY } from '../../entities/enums'
import { GRAPHQL_ENDPOINT } from '../../constants'
import { LoginValidationSchema } from '../validation'
import { LOGIN_MUTATION } from './graphql'
import { ILogin, ILoginResponse } from './types'

export const Login: React.FC<ILogin> = ({ changeDisplay }) => {
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
				const response = await request<ILoginResponse>(GRAPHQL_ENDPOINT, LOGIN_MUTATION, {
					email,
					password,
				})

				// console.log(response)
				localStorage.setItem('binary-stash-token', response.login_user.token)
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
		<Grid item xs={3}>
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
		</Grid>
	)
}
