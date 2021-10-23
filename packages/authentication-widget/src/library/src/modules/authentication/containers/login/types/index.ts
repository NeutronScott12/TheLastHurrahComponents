import { CHANGE_FORM_DISPLAY } from '../../../../../entities/enums'

export interface ILogin {
	changeDisplay: React.Dispatch<React.SetStateAction<CHANGE_FORM_DISPLAY>>
	logInCallback: (response: ILoginResponse) => void
}

export interface ILoginResponse {
	__typename?: 'LoginResponse'
	success: boolean
	message: string
	token: string
	refresh_token: string
	user: { __typename?: 'UserModel'; username: string; id: string }
}
