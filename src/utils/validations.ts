import { FormikHelpers, useFormik } from 'formik'
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
        ...options,
    })
}
export const signUpSchema = Yup.object({
    email: Yup.string()
        .required('Please provide your email')
        .email('Invalid email'),
    password: Yup.string().required('Please provide your password'),
})
