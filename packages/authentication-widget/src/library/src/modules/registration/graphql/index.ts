import { gql } from 'graphql-request'

export const REGISTRATION_MUTATION = gql`
	mutation RegisterMutation(
		$email: String!
		$username: String!
		$password: String!
		$application_id: String
		$redirect_url: String
	) {
		register_user(
			email: $email
			username: $username
			password: $password
			application_id: $application_id
			redirect_url: $redirect_url
		) {
			message
			success
		}
	}
`
