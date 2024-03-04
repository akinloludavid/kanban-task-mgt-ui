import {
    Box,
    Button,
    Flex,
    Icon,
    Image,
    Link,
    Switch,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import Logo from '../../components/Logo'
import { colors } from '../../stylesConfig/customComponents/colors'
import BoardIcon from '../../svgs/BoardIcon'
import { IoEyeOffOutline } from 'react-icons/io5'
import { IoEyeOutline } from 'react-icons/io5'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useColorMode } from '@chakra-ui/react'
import { useGetBoards } from '../../pages/Dashboard/api'
import { NavLink, useLocation } from 'react-router-dom'
import CreateBoardModal from './CreateBoardModal'
import { useState } from 'react'

const Sidebar = () => {
    const { data: boards } = useGetBoards()

    const [showCreateBoard, setShowCreateBoard] = useState(false)

    const sideBarBg = useColorModeValue('light.secBg', 'dark.secBg')
    const colorModeSwitchBg = useColorModeValue('light.mainBg', 'dark.mainBg')
    const { toggleColorMode, colorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    const location = useLocation()
    const isNavActive = (str: string) => {
        return location.pathname.includes(str)
    }
    return (
        <>
            <CreateBoardModal
                onClose={() => setShowCreateBoard(false)}
                isOpen={showCreateBoard}
            />
            <Flex
                flexDir={'column'}
                h='100vh'
                position={'absolute'}
                inset={0}
                w={['300px']}
                py={['32px']}
                px={['32px']}
                borderRight={isDark ? '1px solid #3e3f4e' : '1px solid #e4e3fa'}
                gap={['72px']}
                bgColor={sideBarBg}
            >
                <Logo />
                <Flex flexDir={'column'}>
                    <Text color='secTextColor' fontWeight={'500'} mb='16px'>
                        {boards?.length > 0
                            ? `ALL BOARDS (${boards?.length})`
                            : ''}
                    </Text>
                    <Flex
                        flexDirection={'column'}
                        h='320px'
                        overflowY={'scroll'}
                        ml={['-32px']}
                        pl={'32px'}
                        gap='8px'
                    >
                        {boards?.map((board: any) => (
                            <Link
                                as={NavLink}
                                ml={['-32px']}
                                pl={'32px'}
                                h='48px'
                                borderRightRadius='24px'
                                bgColor={
                                    isNavActive(board?._id) ? 'pryColor' : ''
                                }
                                py='12px'
                                display={'flex'}
                                alignItems='center'
                                _hover={{
                                    textDecoration: 'none',
                                }}
                                to={`/dashboard/board/${board?._id}`}
                                key={board?._id}
                                gap='16px'
                            >
                                <BoardIcon
                                    color={
                                        isNavActive(board?._id)
                                            ? 'white'
                                            : colors.pryColor
                                    }
                                />
                                <Text
                                    color={
                                        isNavActive(board?._id) && !isDark
                                            ? 'white'
                                            : ''
                                    }
                                    fontSize={'16px'}
                                >
                                    {board?.name}
                                </Text>
                            </Link>
                        ))}
                    </Flex>
                    <Button
                        leftIcon={<BoardIcon color={colors.pryColor} />}
                        variant='ghost'
                        w='fit-content'
                        color='pryColor'
                        gap='8px'
                        px='0px'
                        _hover={{}}
                        mt='8px'
                        onClick={() => setShowCreateBoard(true)}
                    >
                        + Create New Board
                    </Button>
                </Flex>
                <Box mt='auto'>
                    <Flex
                        justify={'center'}
                        gap='32px'
                        w='100%'
                        bgColor={colorModeSwitchBg}
                        borderRadius='8px'
                        py={['16px']}
                        align='center'
                    >
                        <Icon
                            as={MdLightMode}
                            fontSize='24px'
                            color='secTextColor'
                            cursor={'pointer'}
                        />

                        <Switch
                            colorScheme='purple'
                            isChecked={colorMode === 'dark'}
                            onChange={toggleColorMode}
                        />
                        <Icon
                            as={MdDarkMode}
                            fontSize='24px'
                            color='secTextColor'
                            cursor={'pointer'}
                        />
                    </Flex>
                    <Flex gap='16px' align={'center'} p={'12px'}>
                        <Icon as={IoEyeOffOutline} color='secTextColor' />
                        <Text
                            color='secTextColor'
                            variant={'medium'}
                            fontWeight='600'
                        >
                            Hide Sidebar
                        </Text>
                    </Flex>
                </Box>
            </Flex>
        </>
    )
}

export default Sidebar
