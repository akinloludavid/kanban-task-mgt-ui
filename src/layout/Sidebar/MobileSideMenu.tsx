import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    Box,
    Button,
    Flex,
    Icon,
    Link,
    Switch,
    Text,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { useGetBoards } from '../../pages/Dashboard/api'
import { colors } from '../../stylesConfig/customComponents/colors'
import BoardIcon from '../../svgs/BoardIcon'
import { IDialog } from '../../types'
import { isNavActive } from '../../utils/helpers'
import CreateBoardModal from './CreateBoardModal'

const MobileMenu = ({ isOpen, onClose }: IDialog) => {
    const { data: boards } = useGetBoards()
    const { toggleColorMode, colorMode, setColorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    const [showCreateBoard, setShowCreateBoard] = useState(false)
    const colorModeSwitchBg = useColorModeValue('light.mainBg', 'dark.mainBg')

    return (
        <>
            <Drawer isOpen={isOpen} placement='bottom' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent p={['32px']}>
                    <CreateBoardModal
                        onClose={() => setShowCreateBoard(false)}
                        isOpen={showCreateBoard}
                    />
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
                                        isNavActive(board?._id)
                                            ? 'pryColor'
                                            : ''
                                    }
                                    py='12px'
                                    display={'flex'}
                                    alignItems='center'
                                    _hover={{
                                        textDecoration: 'none',
                                    }}
                                    onClick={onClose}
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
                            my='8px'
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
                                onClick={() => setColorMode('light')}
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
                                onClick={() => setColorMode('dark')}
                            />
                        </Flex>
                    </Box>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default MobileMenu
