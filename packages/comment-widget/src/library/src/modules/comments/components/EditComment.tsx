import { Button, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useEditThreadCommentMutation } from '../../../generated/graphql'

interface IEditCommentForm {
    comment_body: string
    changeUseEdit: React.Dispatch<React.SetStateAction<boolean>>
    changeUseReplyEdit: React.Dispatch<React.SetStateAction<boolean>>
    comment_id: string
}

export const EditCommentForm: React.FC<IEditCommentForm> = ({
    comment_body,
    changeUseEdit,
    changeUseReplyEdit,
    comment_id,
}) => {
    const [checkError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [editComment] = useEditThreadCommentMutation()
    const formik = useFormik({
        initialValues: {
            body: comment_body,
        },
        async onSubmit({ body }) {
            try {
                if (body === comment_body) {
                    changeUseEdit(false)
                    changeUseReplyEdit(false)
                } else {
                    await editComment({
                        variables: { UpdateCommentInput: { body, comment_id } },
                    })

                    changeUseEdit(false)
                    changeUseReplyEdit(false)
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error)
                    setError(true)
                    setErrorMessage('something went wrong')
                }
            }
        },
    })

    return (
        <div>
            {checkError ? <Alert severity="error">{errorMessage}</Alert> : ''}
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="body"
                    name="body"
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    error={formik.touched.body && Boolean(formik.errors.body)}
                    helperText={formik.touched.body && formik.errors.body}
                />
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </div>
    )
}
