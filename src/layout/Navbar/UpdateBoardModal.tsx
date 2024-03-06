import { Flex, FormControl, FormLabel, Icon, Button } from '@chakra-ui/react'
import { Formik, FieldArray, Field, Form } from 'formik'
import { FaTimes } from 'react-icons/fa'
import CustomInput from '../../components/CustomInput'
import ModalContainer from '../../components/ModalContainer'
import { useAppContext } from '../../context/AppContext'
import { useGetBoardById } from '../../pages/Board/api'
import { useGetBoards } from '../../pages/Dashboard/api'
import { ICreateBoardBody, IDialog } from '../../types'
import { useCustomToast } from '../../utils/toast'
import { createBoardSchema } from '../../utils/validations'
import { useUpdateBoard } from './api'

const UpdateBoardModal = ({ isOpen, onClose }: IDialog) => {
    const { currentBoard } = useAppContext()
    const { data: board, refetch: refetchCurrentBoard } =
        useGetBoardById(currentBoard)
    const { mutate: mutateUpdateBoard, isLoading: isBoardUpdateLoading } =
        useUpdateBoard(currentBoard)

    const { refetch: refetchBoards } = useGetBoards()
    const initialValues: ICreateBoardBody = {
        name: board?.name,
        columns: board?.columns,
    }
    const { successToast } = useCustomToast()
    const onSubmit = (values: ICreateBoardBody) => {
        const payload = {
            boardId: currentBoard,
            body: values,
        }
        mutateUpdateBoard(payload, {
            onSuccess: () => {
                refetchBoards()
                onClose()
                refetchCurrentBoard()
                successToast(`${board?.name} board updated successfully`)
            },
        })
    }
    return (
        <ModalContainer title='Update Board' isOpen={isOpen} onClose={onClose}>
            <Formik
                initialValues={initialValues}
                validationSchema={createBoardSchema}
                onSubmit={onSubmit}
                validateOnChange
                enableReinitialize
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
                                            <Flex flexDir={'column'} gap='8px'>
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
                                                    mt='16px'
                                                    variant={'secondary'}
                                                    w='full'
                                                    onClick={() =>
                                                        arrayHelpers.push('')
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
                                isLoading={isBoardUpdateLoading}
                                _hover={{}}
                            >
                                Update Board
                            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </ModalContainer>
    )
}

export default UpdateBoardModal
