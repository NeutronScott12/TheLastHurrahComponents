import { gql } from 'graphql-request'

export const FORGOT_PASSWORD = gql`
	mutation ForgotPassword($email: String!, $redirect_url: String) {
		forgot_password(email: $email, redirect_url: $redirect_url) {
			message
			success
		}
	}
`
