import React from 'react'
import {
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material'
import { FormikProps } from 'formik'

import { IReportFormFormikValues } from '../components/ReportFormComponent'

interface IReportFormView {
    formik: FormikProps<IReportFormFormikValues>
    changeOpenReport: React.Dispatch<React.SetStateAction<boolean>>
}

export const ReportFormView: React.FC<IReportFormView> = ({
    formik,
    changeOpenReport,
}) => {
    return (
        <div style={{ marginTop: '.5rem' }}>
            <Divider />
            <form onSubmit={formik.handleSubmit}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        Please a select a reason for reporting
                    </FormLabel>
                    <RadioGroup aria-label="report" name="report">
                        <FormControlLabel
                            onChange={formik.handleChange}
                            value="DISAGREE"
                            name="report"
                            control={<Radio />}
                            label="I disagree with this user"
                        />
                        <FormControlLabel
                            onChange={formik.handleChange}
                            value="SPAM"
                            name="report"
                            control={<Radio />}
                            label="Spam — posted spam comments or discussions"
                        />
                        <FormControlLabel
                            onChange={formik.handleChange}
                            value="INAPPROPRIATE_PROFILE"
                            name="report"
                            control={<Radio />}
                            label="Profile contains inappropriate images or text"
                        />
                        <FormControlLabel
                            onChange={formik.handleChange}
                            value="THREATENING_CONTENT"
                            name="report"
                            control={<Radio />}
                            label="Posted directly threatening content"
                        />
                        <FormControlLabel
                            onChange={formik.handleChange}
                            value="PRIVATE_INFORMATION"
                            name="report"
                            control={<Radio />}
                            label="Posted someone else's personally identifiable information"
                        />
                    </RadioGroup>
                    <Button
                        disabled={formik.isSubmitting || formik.dirty === false}
                        color="primary"
                        variant="contained"
                        fullWidth
                        type="submit"
                    >
                        Submit Report
                    </Button>
                    <Button
                        onClick={() => changeOpenReport(false)}
                        color="error"
                        variant="contained"
                        fullWidth
                    >
                        Cancel
                    </Button>
                </FormControl>
            </form>
        </div>
    )
}
