import { CHANGE_FORM_DISPLAY } from '../../../entities/enums'

export interface IForgotPassword {
	changeDisplay: React.Dispatch<React.SetStateAction<CHANGE_FORM_DISPLAY>>
}

export interface IForgotPasswordResponse {
	forgot_password: { message: string; success: boolean }
}
