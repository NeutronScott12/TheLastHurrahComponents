import React from 'react'
import { useFormik } from 'formik'
import { ReportFormView } from '../views/ReportFormView'
import {
    Report_Reason,
    useCreateReportMutation,
} from '../../../generated/graphql'

export interface IReportFormFormikValues {
    report: Report_Reason | ''
}

interface IReportFormComponent {
    changeOpenReport: React.Dispatch<React.SetStateAction<boolean>>
    comment_id: string
}

export const ReportFormComponent: React.FC<IReportFormComponent> = ({
    changeOpenReport,
    comment_id,
}) => {
    const [createReport] = useCreateReportMutation()

    const formik = useFormik<IReportFormFormikValues>({
        initialValues: {
            report: '',
        },
        async onSubmit(values) {
            try {
                console.log('VALUES', values)
                if (values.report) {
                    await createReport({
                        variables: {
                            createReportInput: {
                                comment_id,
                                report: values.report,
                            },
                        },
                    })
                }

                changeOpenReport(false)
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error)
                }
            }
        },
    })

    return (
        <ReportFormView changeOpenReport={changeOpenReport} formik={formik} />
    )
}
