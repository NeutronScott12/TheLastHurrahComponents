import { gql } from 'graphql-request'

export const LOGIN_MUTATION = gql`
	mutation LoginMutation($email: String!, $password: String!) {
		login_user(email: $email, password: $password) {
			success
			refresh_token
			token
			user {
				id
				email
				username
			}
		}
	}
`
