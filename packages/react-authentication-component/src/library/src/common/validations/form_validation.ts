import * as yup from 'yup'

export const forgotPasswordValidationSchema = yup.object({
    email: yup.string().email('Invalid Email').required('Email is required'),
})

export const RegistrationValidationSchema = yup.object({
    email: yup.string().email('Invalid Email').required('Email is required'),
    password: yup
        .string()
        .min(3, 'Password should be of minimum 3 characters length')
        .required('Password is required'),
    repeat_password: yup
        .string()
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value
        }),
    username: yup.string().required(),
})

export const LoginValidationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(3).required(),
})

export const TwoFactorValidationSchema = yup.object().shape({
    two_factor_id: yup.string().required(),
})
