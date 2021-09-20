import { gql } from 'graphql-request'

export const REGISTRATION_MUTATION = gql`
	mutation RegistrationMutation(
		$username: String!
		$email: String!
		$password: String!
		$redirect_url: String
	) {
		register_user(
			username: $username
			email: $email
			password: $password
			redirect_url: $redirect_url
		) {
			success
			message
		}
	}
`
