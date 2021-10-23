import { ApolloProvider } from '@apollo/client'
import React, { useState } from 'react'
import { client } from '../apollo'
import { CHANGE_FORM_DISPLAY } from './entities/enums'
import { ForgotPassword } from './modules/authentication/containers/forgot_password/ForgotPassword'

import { Login } from './modules/authentication/containers/login/Login'
import { ILoginResponse } from './modules/authentication/containers/login/types'
import { Registration } from './modules/authentication/containers/registration/Registration'

interface IBinaryStashAuthenticatorProps {
	application_id: string
	application_name: string
	redirect_url?: string
	logInCallback: (response: ILoginResponse) => void
}

export const BinaryStashAuthenticator: React.FC<IBinaryStashAuthenticatorProps> = ({
	application_id,
	logInCallback,
}) => {
	const [showDisplay, changeDisplay] = useState(CHANGE_FORM_DISPLAY.LOGIN)

	const Display = () => {
		switch (showDisplay) {
			case CHANGE_FORM_DISPLAY.LOGIN:
				return <Login logInCallback={logInCallback} changeDisplay={changeDisplay} />
			case CHANGE_FORM_DISPLAY.REGISTRATION:
				return (
					<Registration application_id={application_id} changeDisplay={changeDisplay} />
				)
			case CHANGE_FORM_DISPLAY.FORGOT_PASSWORD:
				return <ForgotPassword changeDisplay={changeDisplay} />
			default:
				return <Login logInCallback={logInCallback} changeDisplay={changeDisplay} />
		}
	}

	return (
		<ApolloProvider client={client}>
			<h2>Authentication Should load here</h2>
			{/* <Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justifyContent="center"
				// style={{ minHeight: '100vh' }}
			> */}
			<Display />
			{/* </Grid> */}
		</ApolloProvider>
	)
}
