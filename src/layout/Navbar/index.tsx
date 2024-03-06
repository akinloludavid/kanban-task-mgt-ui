import {
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorMode,
    useColorModeValue,
    useMediaQuery,
} from '@chakra-ui/react'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { useState } from 'react'
import { FaChevronDown, FaEllipsisV, FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Logo from '../../components/Logo'
import ModalContainer from '../../components/ModalContainer'
import { useAppContext } from '../../context/AppContext'
import { useGetBoardById } from '../../pages/Board/api'
import { useGetBoards } from '../../pages/Dashboard/api'
import { DASHBOARD } from '../../routes/pathnames'
import { handleLogout } from '../../utils/helpers'
import { useCustomToast } from '../../utils/toast'
import MobileMenu from '../Sidebar/MobileSideMenu'
import { useDeleteBoard } from './api'
import CreateNewTaskModal from './CreateNewTaskModal'
import UpdateBoardModal from './UpdateBoardModal'

const Navbar = () => {
    const [isMobile] = useMediaQuery(['(max-width: 480px)'])
    const { mutate: mutateDeleteBoard, isLoading: isDeletingBoard } =
        useDeleteBoard()
    const { currentBoard } = useAppContext()
    const { data: board, isLoading } = useGetBoardById(currentBoard)
    const { refetch: refetchBoards } = useGetBoards()
    const navigate = useNavigate()
    const { colorMode } = useColorMode()
    const { successToast, errorToast } = useCustomToast()
    const isDark = colorMode === 'dark'
    const navBarBg = useColorModeValue('light.secBg', 'dark.secBg')
    const [isUpdateBoardOpen, setIsUpdateBoardOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [showCreateTask, setShowCreateTask] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false)
    }
    const handleCloseUpdateBoardModal = () => {
        setIsUpdateBoardOpen(false)
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
                navigate(DASHBOARD)
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
            <MobileMenu
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
            />
            <Flex
                bgColor={navBarBg}
                h={['96px']}
                align='center'
                justify={'space-between'}
                borderBottom={
                    isDark ? '1px solid #3e3f4e' : '1px solid #e4e3fa'
                }
                px={['24px']}
            >
                <>
                    <Flex gap='16px' align={'center'}>
                        {isMobile && <Logo />}
                        <Flex
                            align={'center'}
                            gap='12px'
                            display={board?.name ? 'flex' : 'none'}
                        >
                            <Heading
                                onClick={() => {
                                    if (isMobile) {
                                        setShowDialog(true)
                                    }
                                }}
                                variant={['h2', 'h1']}
                            >
                                {board?.name}
                            </Heading>
                            <Icon
                                as={FaChevronDown}
                                display={['flex', 'none']}
                                fontSize='12px'
                                color='pryColor'
                            />
                        </Flex>
                    </Flex>
                </>

                <Flex align={'center'} gap='16px'>
                    <Button
                        w='fit-content'
                        leftIcon={isMobile ? undefined : <FaPlus />}
                        onClick={() => setShowCreateTask(true)}
                        isDisabled={!currentBoard}
                        _hover={{}}
                    >
                        {isMobile ? (
                            <>
                                <FaPlus />
                            </>
                        ) : (
                            'Add Task'
                        )}
                    </Button>

                    <Menu>
                        <MenuButton
                            disabled={isLoading || !currentBoard}
                            display={'flex'}
                            alignItems='center'
                            mb='-6px'
                        >
                            <Icon
                                as={FaEllipsisV}
                                color='secTextColor'
                                cursor={'pointer'}
                                h='100%'
                                my='0px'
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem
                                onClick={() => setIsUpdateBoardOpen(true)}
                            >
                                Edit Board
                            </MenuItem>
                            <MenuItem
                                color='danger'
                                onClick={() => setIsDeleteModalOpen(true)}
                            >
                                Delete Board
                            </MenuItem>
                            <MenuItem color='danger' onClick={handleLogout}>
                                Logout
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
            <UpdateBoardModal
                isOpen={isUpdateBoardOpen}
                onClose={handleCloseUpdateBoardModal}
            />

            <CreateNewTaskModal
                isOpen={showCreateTask}
                onClose={handleCloseNewTask}
            />
        </>
    )
}

export default Navbar
