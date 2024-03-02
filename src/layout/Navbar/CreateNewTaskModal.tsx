import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Textarea,
} from '@chakra-ui/react'
import { Field, FieldArray, Form, Formik } from 'formik'
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import CustomInput from '../../components/CustomInput'
import ModalContainer from '../../components/ModalContainer'
import { ICreateTask, IDialog } from '../../types'
import { createBoardSchema, createTaskSchema } from '../../utils/validations'

const CreateNewTaskModal = ({ isOpen, onClose }: IDialog) => {
    const onSubmit = (values: ICreateTask) => {}
    const initialValues: ICreateTask = {
        title: '',
        description: '',
        status: '',
        subtasks: [],
    }
    return (
        <ModalContainer title='Add New Task' isOpen={isOpen} onClose={onClose}>
            <Formik
                initialValues={initialValues}
                validationSchema={createTaskSchema}
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
                    setValues,
                }) => (
                    <Form>
                        <Flex flexDir={'column'} gap='16px'>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <CustomInput
                                    error={
                                        touched.title && errors.title
                                            ? errors.title
                                            : ''
                                    }
                                    name='title'
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='E.g Take coffee break'
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <CustomInput
                                    as={Textarea}
                                    error={
                                        touched.title && errors.title
                                            ? errors.title
                                            : ''
                                    }
                                    name='title'
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={`e.g. It’s always good to take a break. This 15 minute break will 
                                    recharge the batteries a little.`}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Subtasks</FormLabel>
                                <FieldArray
                                    name='columns'
                                    render={arrayHelpers => {
                                        const columnValues: any = values
                                        const columnTouched: any = touched
                                        const columnErrors: any = errors

                                        return (
                                            <Flex flexDir={'column'} gap='8px'>
                                                {values.subtasks.map(
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
                                                                error={
                                                                    columnTouched
                                                                        ?.columns?.[
                                                                        index
                                                                    ] &&
                                                                    columnErrors
                                                                        ?.columns?.[
                                                                        index
                                                                    ]
                                                                        ? columnErrors
                                                                              ?.columns?.[
                                                                              index
                                                                          ]
                                                                        : ''
                                                                }
                                                                placeholder=''
                                                                onChange={e => {
                                                                    const val =
                                                                        e.target
                                                                            .value
                                                                    if (val) {
                                                                        setFieldValue(
                                                                            `columns${index}`,
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                        setValues(
                                                                            prev => {
                                                                                const newColumns =
                                                                                    prev.subtasks.map(
                                                                                        (
                                                                                            col,
                                                                                            idx,
                                                                                        ) =>
                                                                                            idx ===
                                                                                            index
                                                                                                ? val
                                                                                                : col,
                                                                                    )
                                                                                const updatedValues: any =
                                                                                    {
                                                                                        title: values.title,
                                                                                        description:
                                                                                            values.description,
                                                                                        status: values.status,
                                                                                        subtasks:
                                                                                            newColumns,
                                                                                    }
                                                                                return updatedValues
                                                                            },
                                                                        )
                                                                        setFieldError(
                                                                            `columns${index}`,
                                                                            '',
                                                                        )
                                                                        setErrors(
                                                                            {
                                                                                ...errors,
                                                                                subtasks:
                                                                                    [],
                                                                            },
                                                                        )
                                                                    } else {
                                                                        setErrors(
                                                                            {
                                                                                ...errors,
                                                                                subtasks:
                                                                                    columnErrors
                                                                                        ?.columns[
                                                                                        index
                                                                                    ],
                                                                            },
                                                                        )
                                                                    }
                                                                }}
                                                                value={
                                                                    values
                                                                        .subtasks[
                                                                        index
                                                                    ].subtitle
                                                                        ? values
                                                                              .subtasks[
                                                                              index
                                                                          ]
                                                                              .subtitle
                                                                        : ''
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
                                                        arrayHelpers.push('')
                                                    }
                                                >
                                                    + Add New Subtask
                                                </Button>
                                            </Flex>
                                        )
                                    }}
                                />
                            </FormControl>
                            <Button
                                w='full'
                                type='submit'
                                // isLoading={isBoardCreationLoading}
                            >
                                Create Task
                            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </ModalContainer>
    )
}

export default CreateNewTaskModal
