import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Select,
    Text,
    Textarea,
    useColorModeValue,
} from '@chakra-ui/react'
import { Formik, FieldArray, Field, Form } from 'formik'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { IoEllipsisVertical } from 'react-icons/io5'
import { useAppContext } from '../../context/AppContext'
import { useDeleteTask, useUpdateTask } from '../../layout/Navbar/api'
import { useGetBoardById, useGetTasksInABoard } from '../../pages/Board/api'
import { ICreateTask, ISubtask } from '../../types'
import { useCustomToast } from '../../utils/toast'
import { createTaskSchema } from '../../utils/validations'
import CustomInput from '../CustomInput'
import ModalContainer from '../ModalContainer'

interface ITaskCard {
    title: string
    subtasks: ISubtask[]
    task?: any
}
const TaskCard = ({ title, subtasks, task }: ITaskCard) => {
    console.log(task)
    const taskBgColor = useColorModeValue('light.secBg', 'dark.secBg')
    const subtaskBgColor = useColorModeValue('light.mainBg', 'dark.mainBg')

    const titleColor = useColorModeValue(
        'lightMode.textColor',
        'lightMode.textColor',
    )
    const subTaskColor = useColorModeValue('secTextColor', 'secTextColor')

    const doneSubTasks = subtasks.filter(item => item.done).length
    const [isOpen, setIsOpen] = useState(false)
    const [isFieldDisabled, setFieldDisabled] = useState(true)
    const handleEditTask = () => {
        setFieldDisabled(false)
    }
    const { currentBoard } = useAppContext()
    const { data: board, refetch: refetchCurrentBoard } =
        useGetBoardById(currentBoard)
    const { refetch: refetchTasksInBoard } = useGetTasksInABoard(currentBoard)
    const { mutate: mutateUpdateTask, isLoading: isUpdatingTask } =
        useUpdateTask(task?._id)
    const { mutate: mutateDeleteTask, isLoading: isDeletingTask } =
        useDeleteTask(task?._id)
    const { successToast, errorToast } = useCustomToast()
    const onSubmit = (values: ICreateTask, { resetForm }: any) => {
        const payload = {
            body: values,
            boardId: currentBoard,
        }
        mutateUpdateTask(payload, {
            onSuccess: () => {
                successToast(`Task ${values.title} updated`)
                resetForm()
                refetchCurrentBoard()
                refetchTasksInBoard()
                setIsOpen(false)
                setFieldDisabled(true)
            },
            onError: (err: any) => {
                errorToast(
                    err?.response?.data?.message ||
                        `Error occurred updating task`,
                )
            },
        })
    }
    const initialValues: ICreateTask = {
        subtasks: task?.subtasks?.map((el: any) => {
            return {
                subtitle: el?.subtitle,
                done: el?.done,
            }
        }),
        title,
        description: task?.description,
        status: task?.status,
    }
    const handleModalClose = () => {
        setIsOpen(false)
        setFieldDisabled(true)
    }
    const handleDeleteTask = () => {
        mutateDeleteTask(
            { boardId: currentBoard },
            {
                onSuccess: () => {
                    successToast(`Task deleted successfully`)
                    setIsOpen(false)
                    refetchTasksInBoard()
                },
                onError: () => {
                    errorToast(`Task deleted successfully`)
                },
            },
        )
    }
    return (
        <Box
            bgColor={taskBgColor}
            borderRadius='8px'
            px='16px'
            py='23px'
            boxShadow='2px 4px 8px rgba(0,0,0,0.05)'
            display={'flex'}
            flexDir='column'
            gap='16px'
            cursor={'pointer'}
            _active={{
                cursor: 'grabbing',
            }}
            shadow='lg'
            role='button'
            onClick={() => setIsOpen(true)}
        >
            <ModalContainer isOpen={isOpen} onClose={handleModalClose}>
                {isFieldDisabled ? (
                    <Flex flexDir={'column'} gap='24px'>
                        <Flex align={'center'} justify='space-between'>
                            <Heading>{task?.title}</Heading>
                            <Menu>
                                <MenuButton my='0px'>
                                    <Icon
                                        as={IoEllipsisVertical}
                                        mb='0px'
                                        cursor='pointer'
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={handleEditTask}>
                                        Edit Task
                                    </MenuItem>
                                    <MenuItem
                                        color='danger'
                                        onClick={handleDeleteTask}
                                    >
                                        {' '}
                                        Delete Task
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                        <Text color={'secTextColor'}>{task?.description}</Text>
                        <Flex flexDir={'column'}>
                            <FormLabel mb='16px'>
                                Subtasks ({doneSubTasks} of {subtasks.length})
                            </FormLabel>
                            <Flex flexDir={'column'} gap='8px'>
                                {subtasks.map(subtask => (
                                    <Flex
                                        align='center'
                                        bgColor={subtaskBgColor}
                                        borderRadius='4px'
                                        p='12px'
                                        gap='12px'
                                    >
                                        <Checkbox
                                            isDisabled={isFieldDisabled}
                                            colorScheme={'purple'}
                                            gap='4px'
                                        >
                                            <Text>{subtask.subtitle}</Text>
                                        </Checkbox>
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>

                        <Select
                            value={task?.status}
                            isDisabled={isFieldDisabled}
                        >
                            {task?.board?.columns?.map((el: string) => (
                                <option key={el} value={el}>
                                    {el}
                                </option>
                            ))}
                        </Select>
                    </Flex>
                ) : (
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
                                                const columnValues: any = values
                                                const columnTouched: any =
                                                    touched
                                                const columnErrors: any = errors
                                                console.log({ columnErrors })
                                                console.log({ columnValues })
                                                console.log({ columnTouched })
                                                return (
                                                    <Flex
                                                        flexDir={'column'}
                                                        gap='8px'
                                                    >
                                                        {values.subtasks.map(
                                                            (
                                                                subtask,
                                                                index,
                                                            ) => (
                                                                <Flex
                                                                    key={index}
                                                                    align={
                                                                        'center'
                                                                    }
                                                                    gap='16px'
                                                                    justify='space-between'
                                                                >
                                                                    <CustomInput
                                                                        as={
                                                                            Field
                                                                        }
                                                                        name={`subtasks${index}.subtitle`}
                                                                        onChange={e => {
                                                                            const val =
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            if (
                                                                                val
                                                                            ) {
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
                                                                            ]
                                                                                ?.subtitle
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
                                                                            ]
                                                                                ?.subtitle
                                                                                ? values
                                                                                      .subtasks[
                                                                                      index
                                                                                  ]
                                                                                      ?.subtitle
                                                                                : ''
                                                                        }
                                                                    />
                                                                    <Icon
                                                                        as={
                                                                            FaTimes
                                                                        }
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
                                                            variant={
                                                                'secondary'
                                                            }
                                                            w='full'
                                                            onClick={() =>
                                                                arrayHelpers.push(
                                                                    {
                                                                        subtitle:
                                                                            '',
                                                                        done: false,
                                                                    },
                                                                )
                                                            }
                                                        >
                                                            + Add New Subtask
                                                        </Button>
                                                        <FormLabel>
                                                            Status
                                                        </FormLabel>
                                                        <Select
                                                            placeholder='Status'
                                                            onChange={
                                                                handleChange
                                                            }
                                                            name='status'
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.status
                                                            }
                                                        >
                                                            {board?.columns?.map(
                                                                (
                                                                    column: string,
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            column
                                                                        }
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
                                        isLoading={isUpdatingTask}
                                        _hover={{}}
                                    >
                                        Update Task
                                    </Button>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                )}
            </ModalContainer>
            <Heading color={titleColor} variant={'h2'} as='h2'>
                {title}
            </Heading>
            <Text color={subTaskColor}>
                {doneSubTasks} of {subtasks.length} subtasks
            </Text>
        </Box>
    )
}

export default TaskCard
