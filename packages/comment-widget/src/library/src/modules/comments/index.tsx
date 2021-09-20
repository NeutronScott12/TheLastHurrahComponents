import { useFormik } from 'formik'
import React from 'react'
import { useFindOneOrCreateOneThreadQuery } from '../../generated/graphql'
import { CommentList } from './components/CommentList'

interface ICommentContainerProps {
    application_id: string
    website_url: string
    title: string
}

export const CommentContainer: React.FC<ICommentContainerProps> = ({
    application_id,
    website_url,
    title,
}) => {
    const { data, loading } = useFindOneOrCreateOneThreadQuery({
        variables: {
            findOrCreateOneThreadInput: {
                application_id,
                title,
                website_url,
            },
        },
    })

    const formik = useFormik({
        initialValues: {
            body: '',
        },
        async onSubmit(values) {
            console.log(values)
        },
    })

    console.log('DATA', data)

    return loading ? (
        <div>...loading</div>
    ) : (
        <div>
            <h2>Comment Container</h2>
            <CommentList
                thread_id={data ? data?.find_one_thread_or_create_one.id : ''}
            />
        </div>
    )
}
