import React from 'react'

import { useFormik } from 'formik'
import { CommentAPI } from '@thelasthurrah/comment_api'
import * as yup from 'yup'
interface IFormValues {
    body: string
}

const validationSchema = yup.object({
    body: yup.string().required(),
})

function App() {
    const response = new CommentAPI(
        'http://localhost:4000/graphql',
        'first-application',
    )

    const formik = useFormik<IFormValues>({
        initialValues: {
            body: '',
        },
        validationSchema,
        onSubmit() {
            console.log('WORKING')
        },
    })

    console.log(response.queries.fetch_comemnts())

    return (
        <div className="App">
            <div>Test</div>
        </div>
    )
}

export default App
