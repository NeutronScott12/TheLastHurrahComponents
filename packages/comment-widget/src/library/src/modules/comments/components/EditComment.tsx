import { Button, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useFormik } from 'formik'
import React, { useState } from 'react'

interface IEditCommentForm {
    comment_body: string
}

export const EditCommentForm: React.FC<IEditCommentForm> = ({
    comment_body,
}) => {
    const [checkError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const formik = useFormik({
        initialValues: {
            body: comment_body,
        },
        async onSubmit({ body }) {
            console.log(body)
            try {
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
                    label="Leave a comment"
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
