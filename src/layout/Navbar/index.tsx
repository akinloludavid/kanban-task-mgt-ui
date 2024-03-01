import { useColorMode, useColorModeValue } from '@chakra-ui/react'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'

const Navbar = () => {
    const { colorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    const navBarBg = useColorModeValue('light.secBg', 'dark.secBg')
    return (
        <Flex
            bgColor={navBarBg}
            h={['96px']}
            align='center'
            justify={'space-between'}
            borderBottom={isDark ? '1px solid #3e3f4e' : '1px solid #e4e3fa'}
            px={['32px']}
        >
            <Heading>Platform Launch</Heading>

            <Flex>
                <Button leftIcon={<FaPlus />}>Add Task</Button>
            </Flex>
        </Flex>
    )
}

export default Navbar
