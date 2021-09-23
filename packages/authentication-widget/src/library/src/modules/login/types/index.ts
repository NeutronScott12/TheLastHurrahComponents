import { CHANGE_FORM_DISPLAY } from '../../../entities/enums'

export interface ILogin {
	changeDisplay: React.Dispatch<React.SetStateAction<CHANGE_FORM_DISPLAY>>
	logInCallback: (response: ILoginResponse) => void
}

export interface ILoginResponse {
	login_user: {
		success: boolean
		refresh_token: string
		token: string
		user: {
			id: string
			email: string
			username: string
		}
	}
}
