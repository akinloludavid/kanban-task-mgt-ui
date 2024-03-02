import {
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { useState } from 'react'
import { FaEllipsisV, FaPlus } from 'react-icons/fa'
import ModalContainer from '../../components/ModalContainer'
import { useAppContext } from '../../context/AppContext'
import { useGetBoardById } from '../../pages/Board/api'
import { useGetBoards } from '../../pages/Dashboard/api'
import { useCustomToast } from '../../utils/toast'
import { useCreateTask, useDeleteBoard } from './api'
import CreateNewTaskModal from './CreateNewTaskModal'

const Navbar = () => {
    const { mutate: mutateDeleteBoard, isLoading: isDeletingBoard } =
        useDeleteBoard()
    const { currentBoard } = useAppContext()
    const { data: board, isLoading } = useGetBoardById(currentBoard)
    const { refetch: refetchBoards } = useGetBoards()
    const { mutate } = useCreateTask()
    const { colorMode } = useColorMode()
    const { successToast, errorToast } = useCustomToast()
    const isDark = colorMode === 'dark'
    const navBarBg = useColorModeValue('light.secBg', 'dark.secBg')

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [showCreateTask, setShowCreateTask] = useState(false)
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false)
    }
    const handleCloseNewTask = () => {
        setShowCreateTask(false)
    }
    const handleDeleteBoard = () => {
        mutateDeleteBoard(currentBoard || board?._id, {
            onSuccess: () => {
                successToast(`Board ${board?.name} deleted successfull`)
                setIsDeleteModalOpen(false)
                refetchBoards()
            },
            onError: (err: any) => {
                errorToast(
                    err?.response?.data?.message || `Error deleting board`,
                )
            },
        })
    }
    return (
        <>
            <Flex
                bgColor={navBarBg}
                h={['96px']}
                align='center'
                justify={'space-between'}
                borderBottom={
                    isDark ? '1px solid #3e3f4e' : '1px solid #e4e3fa'
                }
                px={['32px']}
            >
                <Heading>{board?.name}</Heading>

                <Flex align={'center'} gap='16px'>
                    <Button
                        w='fit-content'
                        leftIcon={<FaPlus />}
                        onClick={() => setShowCreateTask(true)}
                    >
                        Add Task
                    </Button>

                    <Menu>
                        <MenuButton disabled={isLoading}>
                            <Icon
                                as={FaEllipsisV}
                                color='secTextColor'
                                cursor={'pointer'}
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Edit Board</MenuItem>
                            <MenuItem
                                color='danger'
                                onClick={() => setIsDeleteModalOpen(true)}
                            >
                                Delete Board
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
            <ModalContainer
                title='Delete Board'
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                titleColor='danger'
            >
                <>
                    <Text mb='24px' color='secTextColor'>
                        {`Are you sure you want to delete the ${board?.name}
                        board? This action will remove all columns and tasks and
                        cannot be reversed.`}
                    </Text>
                    <Flex align={'center'} gap='16px'>
                        <Button
                            variant={'danger'}
                            w='full'
                            isLoading={isDeletingBoard}
                            onClick={handleDeleteBoard}
                            _hover={{}}
                        >
                            Delete
                        </Button>
                        <Button
                            variant={'secondary'}
                            w='full'
                            onClick={handleCloseDeleteModal}
                        >
                            Cancel
                        </Button>
                    </Flex>
                </>
            </ModalContainer>
            <CreateNewTaskModal
                isOpen={showCreateTask}
                onClose={handleCloseNewTask}
            />
        </>
    )
}

export default Navbar
