import React from 'react'
import { MenuItem, Select, TextField, FormLabel, Button } from '@mui/material'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
    OptionInput,
    useCreatePollMutationMutation,
} from '../../../generated/graphql'
import { IModerator } from '../types'

type IOptionInput = {
    option: string
}

interface IVoteFormValues {
    title: string
    options: IOptionInput[]
    questions: number
}

interface IVoteFormComponent {
    thread_id: string
    moderators: IModerator[] | undefined
}

export const VoteFormComponent: React.FC<IVoteFormComponent> = ({
    thread_id,
    moderators,
}) => {
    const [createPoll] = useCreatePollMutationMutation()

    const initialValues: IVoteFormValues = {
        questions: 0,
        options: [],
        title: '',
    }

    const validationSchema = Yup.object().shape({
        questions: Yup.string().required('Number of questions is required'),
        options: Yup.array().of(
            Yup.object().shape({
                option: Yup.string().required('Option is required'),
            }),
        ),
    })

    function onChangeTickets(
        e: any,
        field: any,
        values: IVoteFormValues,
        setValues: (
            values: React.SetStateAction<IVoteFormValues>,
            shouldValidate?: boolean | undefined,
        ) => void,
    ) {
        // update dynamic form
        const options = [...values.options]
        const numberOfOptions = e.target.value || 0
        const previousNumber = parseInt(field.value || '0')
        if (previousNumber < numberOfOptions) {
            for (let i = previousNumber; i < numberOfOptions; i++) {
                options.push({ option: '' })
            }
        } else {
            for (let i = previousNumber; i >= numberOfOptions; i--) {
                options.splice(i, 1)
            }
        }
        setValues({ ...values, options })

        // call formik onChange method
        field.onChange(e)
    }

    const onSubmit = async (fields: {
        title: string
        options: OptionInput[]
    }) => {
        // display form field values on success
        console.log(fields)

        try {
            await createPoll({
                variables: {
                    createPollInput: {
                        options: fields.options,
                        title: fields.title,
                        thread_id,
                    },
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Formik
            //@ts-ignore
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, values, touched, setValues, handleChange }) => (
                <Form>
                    <TextField
                        id="title"
                        name="title"
                        label="Title"
                        value={values.title}
                        onChange={handleChange}
                        helperText={touched.title ? errors.title : ''}
                        error={touched.title && Boolean(errors.title)}
                    />
                    <FormLabel>Number of Questions</FormLabel>
                    <Field name="numberOfTickets">
                        {({ field }: any) => (
                            <Select
                                {...field}
                                defaultValue={1}
                                onChange={(e) =>
                                    //@ts-ignore
                                    onChangeTickets(e, field, values, setValues)
                                }
                            >
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <MenuItem key={i} value={i}>
                                        {i}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    </Field>
                    <ErrorMessage
                        name="numberOfTickets"
                        component="div"
                        className="invalid-feedback"
                    />

                    <FieldArray name="options">
                        {() =>
                            values.options.map((option: IOptionInput, i) => {
                                const optionsErrors =
                                    (errors.options?.length &&
                                        errors.options[i]) ||
                                    {}
                                const optionsTouched =
                                    (touched.options?.length &&
                                        touched.options[i]) ||
                                    {}
                                return (
                                    <div
                                        key={i}
                                        className="list-group list-group-flush"
                                    >
                                        <label>Add question here</label>
                                        <Field
                                            name={`options.${i}.option`}
                                            type="text"
                                            className={
                                                'form-control' +
                                                //@ts-ignore
                                                (optionsErrors.option &&
                                                optionsTouched.option
                                                    ? ' is-invalid'
                                                    : '')
                                            }
                                        />
                                        <ErrorMessage
                                            name={`options.${i}.option`}
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                )
                            })
                        }
                    </FieldArray>
                    <Button type="submit">Submit</Button>
                </Form>
            )}
        </Formik>
    )
}
