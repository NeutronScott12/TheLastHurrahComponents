import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { CHANGE_FORM_DISPLAY } from './entities/enums'
import { ForgotPassword } from './modules/forgot_password/ForgotPassword'

import { Login } from './modules/login/Login'
import { Registration } from './modules/registration/Registration'

interface IBinaryStashAuthenticatorProps {
	application_id: string
	application_name: string
	redirect_url?: string
}

export const BinaryStashAuthenticator: React.FC<IBinaryStashAuthenticatorProps> = ({
	application_id,
}) => {
	const [showDisplay, changeDisplay] = useState(CHANGE_FORM_DISPLAY.LOGIN)

	const Display = () => {
		switch (showDisplay) {
			case CHANGE_FORM_DISPLAY.LOGIN:
				return <Login changeDisplay={changeDisplay} />
			case CHANGE_FORM_DISPLAY.REGISTRATION:
				return (
					<Registration application_id={application_id} changeDisplay={changeDisplay} />
				)
			case CHANGE_FORM_DISPLAY.FORGOT_PASSWORD:
				return <ForgotPassword changeDisplay={changeDisplay} />
			default:
				return <Login changeDisplay={changeDisplay} />
		}
	}

	return (
		<div>
			<h2>Authentication Should load here</h2>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justifyContent="center"
				// style={{ minHeight: '100vh' }}
			>
				<Display />
			</Grid>
		</div>
	)
}
