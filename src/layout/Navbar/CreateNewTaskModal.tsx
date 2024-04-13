import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Select,
    Text,
    Textarea,
} from '@chakra-ui/react'
import { Field, FieldArray, Form, Formik } from 'formik'
import { FaTimes } from 'react-icons/fa'
import CustomInput from '../../components/CustomInput'
import ModalContainer from '../../components/ModalContainer'
import { useAppContext } from '../../context/AppContext'
import { useGetBoardById, useGetTasksInABoard } from '../../pages/Board/api'
import { ICreateTask, IDialog } from '../../types'
import { useCustomToast } from '../../utils/toast'
import { createTaskSchema } from '../../utils/validations'
import { useCreateTask } from './api'

const CreateNewTaskModal = ({ isOpen, onClose }: IDialog) => {
    const { currentBoard } = useAppContext()
    const { data: board, refetch: refetchCurrentBoard } =
        useGetBoardById(currentBoard)
    const { refetch: refetchTasksInBoard } = useGetTasksInABoard(currentBoard)
    const { mutate: mutateCreateTask, isLoading: isCreatingTask } =
        useCreateTask()
    const { successToast, errorToast } = useCustomToast()
    const onSubmit = (values: ICreateTask, { resetForm }: any) => {
        mutateCreateTask(values, {
            onSuccess: () => {
                successToast(`Task ${values.title} created`)
                resetForm()
                onClose()
                refetchCurrentBoard()
                refetchTasksInBoard()
            },
            onError: (err: any) => {
                errorToast(
                    err?.response?.data?.message ||
                        `Error occurred creating task`,
                )
            },
        })
    }
    const initialValues: ICreateTask = {
        title: '',
        description: '',
        status: '',
        subtasks: [],
        boardId: currentBoard,
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
                                        touched.description &&
                                        errors.description
                                            ? errors.description
                                            : ''
                                    }
                                    name='description'
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={`e.g. It’s always good to take a break. This 15 minute break will 
                                    recharge the batteries a little.`}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Subtasks</FormLabel>
                                <FieldArray
                                    name='subtasks'
                                    render={arrayHelpers => {
                                        const columnTouched: any = touched
                                        const columnErrors: any = errors

                                        return (
                                            <Flex flexDir={'column'} gap='8px'>
                                                {values.subtasks.map(
                                                    (subtask, index) => (
                                                        <Flex
                                                            key={index}
                                                            align={'center'}
                                                            gap='16px'
                                                            justify='space-between'
                                                        >
                                                            <CustomInput
                                                                as={Field}
                                                                name={`subtasks${index}.subtitle`}
                                                                onChange={e => {
                                                                    const val =
                                                                        e.target
                                                                            .value
                                                                    if (val) {
                                                                        setValues(
                                                                            prev => {
                                                                                const newSubtasks =
                                                                                    prev.subtasks.map(
                                                                                        (
                                                                                            el,
                                                                                            i,
                                                                                        ) =>
                                                                                            i ===
                                                                                            index
                                                                                                ? {
                                                                                                      ...el,
                                                                                                      subtitle:
                                                                                                          e
                                                                                                              .target
                                                                                                              .value,
                                                                                                  }
                                                                                                : el,
                                                                                    )
                                                                                const updatedVal =
                                                                                    {
                                                                                        ...values,
                                                                                        subtasks:
                                                                                            newSubtasks,
                                                                                    }
                                                                                return updatedVal
                                                                            },
                                                                        )
                                                                    }
                                                                }}
                                                                error={
                                                                    columnTouched
                                                                        ?.subtasks?.[
                                                                        index
                                                                    ]
                                                                        ?.subtitle &&
                                                                    columnErrors
                                                                        ?.subtasks?.[
                                                                        index
                                                                    ]?.subtitle
                                                                        ? columnErrors
                                                                              ?.subtasks?.[
                                                                              index
                                                                          ]
                                                                              ?.subtitle
                                                                        : ''
                                                                }
                                                                placeholder=''
                                                                value={
                                                                    values
                                                                        .subtasks[
                                                                        index
                                                                    ]?.subtitle
                                                                        ? values.subtasks[
                                                                              index
                                                                          ]?.subtitle?.trim()
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
                                                        arrayHelpers.push({
                                                            subtitle: '',
                                                            done: false,
                                                        })
                                                    }
                                                >
                                                    + Add New Subtask
                                                </Button>
                                                <FormLabel>Status</FormLabel>
                                                <Select
                                                    placeholder='Status'
                                                    onChange={handleChange}
                                                    name='status'
                                                    onBlur={handleBlur}
                                                    value={values.status}
                                                >
                                                    {board?.columns?.map(
                                                        (column: string) => (
                                                            <option
                                                                key={column}
                                                            >
                                                                {column}
                                                            </option>
                                                        ),
                                                    )}
                                                </Select>
                                                <Text
                                                    color='danger'
                                                    variant='small'
                                                >
                                                    {touched.status &&
                                                    errors.status
                                                        ? errors?.status
                                                        : ''}
                                                </Text>
                                            </Flex>
                                        )
                                    }}
                                />
                            </FormControl>
                            <Button
                                w='full'
                                type='submit'
                                isLoading={isCreatingTask}
                                _hover={{}}
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
