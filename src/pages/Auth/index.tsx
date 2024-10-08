import { Box, Flex, Image, useColorModeValue } from '@chakra-ui/react'
import ColorModeToggle from '../../components/ColorModeToggle'
import { IChildren } from '../../types'

const AuthContainer = ({ children }: IChildren) => {
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
                    onClick={() => {}}
                    src='/assets/logo-mobile.svg'
                    w={'10%'}
                    maxW='64px'
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
                p={['16px', '24px', '48px']}
            >
                {children}
            </Flex>
        </Box>
    )
}

export default AuthContainer
