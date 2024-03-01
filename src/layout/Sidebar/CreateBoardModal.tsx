import { Button, Flex, FormControl, Icon } from '@chakra-ui/react'
import { FormLabel, Text } from '@chakra-ui/react'
import { Field, FieldArray, Form, Formik, ErrorMessage } from 'formik'
import { FaTimes } from 'react-icons/fa'
import CustomInput from '../../components/CustomInput'
import ModalContainer from '../../components/ModalContainer'
import { ICreateBoardBody, IDialog } from '../../types'
import { useCustomToast } from '../../utils/toast'
import { createBoardSchema, useCustomFormik } from '../../utils/validations'

const CreateBoardModal = ({ onClose, isOpen }: IDialog) => {
    const initialValues = {
        name: '',
        columns: [],
    }
    const { successToast } = useCustomToast()
    const onSubmit = (values: ICreateBoardBody) => {
        alert(JSON.stringify(values))
        successToast('here')
    }

    return (
        <>
            <ModalContainer
                onClose={onClose}
                isOpen={isOpen}
                title='Add New Board'
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={createBoardSchema}
                    onSubmit={onSubmit}
                    validateOnChange
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                        setFieldError,
                        setErrors,
                    }) => (
                        <Form>
                            <Flex flexDir={'column'} gap='16px'>
                                <FormControl>
                                    <FormLabel>Board Name</FormLabel>
                                    <CustomInput
                                        error={
                                            touched.name && errors.name
                                                ? errors.name
                                                : ''
                                        }
                                        name='name'
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='E.g Web Design'
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Board Columns</FormLabel>
                                    <FieldArray
                                        name='columns'
                                        render={arrayHelpers => {
                                            const columnValues: any = values
                                            const columnTouched: any = touched
                                            const columnErrors: any = errors
                                            console.log(columnErrors)

                                            return (
                                                <Flex
                                                    flexDir={'column'}
                                                    gap='8px'
                                                >
                                                    {values.columns.map(
                                                        (column, index) => (
                                                            <Flex
                                                                key={index}
                                                                align={'center'}
                                                                gap='16px'
                                                                justify='space-between'
                                                            >
                                                                <CustomInput
                                                                    as={Field}
                                                                    name={`columns${index}`}
                                                                    placeholder=''
                                                                    onChange={e => {
                                                                        const val =
                                                                            e
                                                                                .target
                                                                                .value
                                                                        if (
                                                                            val
                                                                        ) {
                                                                            setFieldValue(
                                                                                `columns${index}`,
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                            setFieldError(
                                                                                `columns${index}`,
                                                                                '',
                                                                            )
                                                                            setErrors(
                                                                                {
                                                                                    ...errors,
                                                                                    columns:
                                                                                        [],
                                                                                },
                                                                            )
                                                                        }
                                                                    }}
                                                                    error={
                                                                        columnTouched?.[
                                                                            `columns${index}`
                                                                        ] &&
                                                                        columnErrors?.[
                                                                            `columns${index}`
                                                                        ]
                                                                            ? columnErrors?.[
                                                                                  `columns${index}`
                                                                              ]
                                                                            : ''
                                                                    }
                                                                    value={
                                                                        columnValues?.[
                                                                            `columns${index}`
                                                                        ]
                                                                    }
                                                                />
                                                                <Icon
                                                                    as={FaTimes}
                                                                    cursor='pointer'
                                                                    color='secTextColor'
                                                                    fontSize='16px'
                                                                    onClick={() =>
                                                                        arrayHelpers.remove(
                                                                            index,
                                                                        )
                                                                    }
                                                                />
                                                            </Flex>
                                                        ),
                                                    )}

                                                    <Button
                                                        mt='16px'
                                                        variant={'secondary'}
                                                        w='full'
                                                        onClick={() =>
                                                            arrayHelpers.push(
                                                                '',
                                                            )
                                                        }
                                                    >
                                                        + Add New Column
                                                    </Button>
                                                </Flex>
                                            )
                                        }}
                                    />
                                </FormControl>
                                <Button w='full' type='submit'>
                                    Create New Board
                                </Button>
                            </Flex>
                        </Form>
                    )}
                </Formik>
            </ModalContainer>
        </>
    )
}

export default CreateBoardModal
