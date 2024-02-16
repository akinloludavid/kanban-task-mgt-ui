import {
    Box,
    Flex,
    Image,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react'
import ColorModeToggle from '../../components/ColorModeToggle'
import { IChildren } from '../../types'

const AuthContainer = ({ children }: IChildren) => {
    const { colorMode } = useColorMode()
    const formBg = useColorModeValue('#f3f3f3', '#2b2c37')
    return (
        <Box>
            <Flex
                p='2'
                px={['24px', '34px']}
                justify='space-between'
                align={'center'}
            >
                <Image
                    src={
                        colorMode === 'dark'
                            ? '/assets/logo-light.svg'
                            : '/assets/logo-dark.svg'
                    }
                />
                <ColorModeToggle />
            </Flex>
            <Flex
                bgColor={formBg}
                mx='auto'
                w={['90%', '90%', '90%', '40%']}
                gap='32px'
                py='24px'
                flexDir={'column'}
                borderRadius='4px'
                my={'120px'}
                p={['8px', '24px', '48px']}
            >
                {children}
            </Flex>
        </Box>
    )
}

export default AuthContainer
