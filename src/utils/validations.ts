import { FormikHelpers, FormikProps, useFormik } from 'formik'
import * as Yup from 'yup'

interface ICustomFormik<T> {
    initialValues: T
    validationSchema: Record<string, any>
    onSubmit: (values: T, formikHelpers?: FormikHelpers<T>) => void
}
export const useCustomFormik = <T>({
    initialValues,
    validationSchema,
    onSubmit,
    ...options
}: ICustomFormik<T>) => {
    return useFormik({
        initialValues,
        validationSchema,
        validateOnBlur: true,

        enableReinitialize: true,
        onSubmit,
        validateOnMount: true,
        ...options,
    })
}
export const signUpSchema = Yup.object({
    email: Yup.string()
        .required('Please provide your email')
        .email('Invalid email'),
    password: Yup.string().required('Please provide your password'),
})

export const loginSchema = Yup.object({
    email: Yup.string()
        .required('Please provide your email')
        .email('Invalid email'),
    password: Yup.string().required('Please provide your password'),
})

export const createBoardSchema = Yup.object({
    name: Yup.string().required('Please provide board name'),
    columns: Yup.array().of(Yup.string().required('Required')),
})
export const createTaskSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
    subtasks: Yup.array().of(
        Yup.object({
            subtitle: Yup.string().required('Required'),
            done: Yup.boolean().required(),
        }),
    ),
})
