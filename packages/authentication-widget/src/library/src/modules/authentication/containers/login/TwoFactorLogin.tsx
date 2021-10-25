import React from 'react'
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useTwoFactorLoginMutation } from '../../../../generated/graphql'
import { ILoginResponse } from './types'

interface ITwoFactorFormValues {
	two_factor_code: string
}

interface ITwoFactorLogin {
	logInCallback: (response: ILoginResponse) => void
	email: string
}

export const TwoFactorLogin: React.FC<ITwoFactorLogin> = ({ email }) => {
	const [twoFactorLogin] = useTwoFactorLoginMutation()

	const formik = useFormik<ITwoFactorFormValues>({
		initialValues: { two_factor_code: '' },
		async onSubmit(values) {
			console.log(values)
			try {
				await twoFactorLogin({
					variables: {
						twoFactorInput: {
							email,
							two_factor_id: values.two_factor_code,
						},
					},
				})
			} catch (error) {
				if (error instanceof Error) {
					console.log(error)
					// setError(true)
					// setErrorMessage('something went wrong')
				}
			}
		},
	})

	return (
		<form onSubmit={formik.handleSubmit}>
			<TextField
				autoComplete="off"
				fullWidth
				id="two_factor_code"
				name="two_factor_code"
				label="Enter Code here"
				value={formik.values.two_factor_code}
				onChange={formik.handleChange}
				error={formik.touched.two_factor_code && Boolean(formik.errors.two_factor_code)}
				helperText={formik.touched.two_factor_code && formik.errors.two_factor_code}
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
		</form>
	)
}
