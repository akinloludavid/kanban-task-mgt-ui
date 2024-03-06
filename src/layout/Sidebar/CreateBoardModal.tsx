import { Button, Flex, FormControl, Icon } from '@chakra-ui/react'
import { FormLabel } from '@chakra-ui/react'
import { Field, FieldArray, Form, Formik } from 'formik'
import { FaTimes } from 'react-icons/fa'
import CustomInput from '../../components/CustomInput'
import ModalContainer from '../../components/ModalContainer'
import { useGetBoards } from '../../pages/Dashboard/api'
import { ICreateBoardBody, IDialog } from '../../types'
import { useCustomToast } from '../../utils/toast'
import { createBoardSchema } from '../../utils/validations'
import { useCreateBoard } from './api'

const CreateBoardModal = ({ onClose, isOpen }: IDialog) => {
    const { mutate: mutateCreateBoard, isLoading: isBoardCreationLoading } =
        useCreateBoard()

    const { refetch: refetchBoards } = useGetBoards()
    const initialValues: ICreateBoardBody = {
        name: '',
        columns: [],
    }
    const { successToast } = useCustomToast()
    const onSubmit = (values: ICreateBoardBody) => {
        mutateCreateBoard(values, {
            onSuccess: () => {
                refetchBoards()
                successToast(`Board created successfully`)
                onClose()
            },
        })
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
                        setValues,
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
                                            const columnTouched: any = touched
                                            const columnErrors: any = errors

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
                                                                            setValues(
                                                                                prev => {
                                                                                    const newColumns =
                                                                                        prev.columns.map(
                                                                                            (
                                                                                                col,
                                                                                                idx,
                                                                                            ) =>
                                                                                                idx ===
                                                                                                index
                                                                                                    ? val
                                                                                                    : col,
                                                                                        )
                                                                                    const updatedValues =
                                                                                        {
                                                                                            name: values.name,
                                                                                            columns:
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
                                                                                    columns:
                                                                                        [],
                                                                                },
                                                                            )
                                                                        } else {
                                                                            setErrors(
                                                                                {
                                                                                    ...errors,
                                                                                    columns:
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
                                                                            .columns[
                                                                            index
                                                                        ]
                                                                            ? values
                                                                                  .columns[
                                                                                  index
                                                                              ]
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
                                                        mt='8px'
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
                                <Button
                                    w='full'
                                    type='submit'
                                    isLoading={isBoardCreationLoading}
                                    mt='16px'
                                >
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
