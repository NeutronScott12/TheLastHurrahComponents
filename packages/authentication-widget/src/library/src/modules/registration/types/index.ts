import { CHANGE_FORM_DISPLAY } from '../../../entities/enums'

export interface IRegistration {
	changeDisplay: React.Dispatch<React.SetStateAction<CHANGE_FORM_DISPLAY>>
}

export interface IRegistrationResponse {
	register_user: {
		success: boolean
		message: string
	}
}
