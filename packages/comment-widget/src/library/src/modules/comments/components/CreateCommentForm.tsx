import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { useCreateThreadComentMutation } from '../../../generated/graphql'
import { Button, TextField } from '@material-ui/core'

const validationSchema = yup.object().shape({
    body: yup.string().required(),
})

export const CreateCommentForm = () => {
    const [createComment] = useCreateThreadComentMutation()
    const formik = useFormik({
        initialValues: {
            body: '',
        },
        validationSchema,
        async onSubmit(values) {
            console.log(values)
        },
    })

    return (
        <div>
            <h2>Comment Form</h2>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="body"
                    name="body"
                    label="body"
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
