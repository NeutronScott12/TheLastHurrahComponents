import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useFormik } from 'formik'
import request from 'graphql-request'
import { CHANGE_FORM_DISPLAY } from '../../entities/enums'
import { GRAPHQL_ENDPOINT } from '../../constants'
import { REGISTRATION_MUTATION } from './graphql'
import { RegistrationValidationSchema } from '../validation'
import { IRegistration, IRegistrationResponse } from './types'

export const Registration: React.FC<IRegistration> = ({ changeDisplay, application_id }) => {
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
		},
		validationSchema: RegistrationValidationSchema,
		async onSubmit({ email, username, password }, { setSubmitting }) {
			try {
				const response = await request<IRegistrationResponse>(
					GRAPHQL_ENDPOINT,
					REGISTRATION_MUTATION,
					{
						email,
						username,
						password,
						application_id,
					}
				)

				if (response.register_user.success) {
					setSubmitting(false)
					setSuccess(true)
					setSuccessMessage(response.register_user.message)
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
			{checkSuccess ? <Alert severity="error">{successMessage}</Alert> : ''}
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
					label="username"
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
					label="repeat_password"
					type="repeat_password"
					value={formik.values.repeat_password}
					onChange={formik.handleChange}
					error={formik.touched.repeat_password && Boolean(formik.errors.repeat_password)}
					helperText={formik.touched.repeat_password && formik.errors.repeat_password}
				/>
				<Button color="primary" variant="contained" fullWidth type="submit">
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
