import { Box, useColorModeValue } from '@chakra-ui/react'
import { IChildren } from '../../types'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

export const PublicPageLayout = ({ children }: IChildren) => {
    return <Box>{children}</Box>
}

export const PrivatePageLayout = ({ children }: IChildren) => {
    const secBg = useColorModeValue('light.mainBg', 'dark.mainBg')
    return (
        <Box
            mx='auto'
            position={'relative'}
            maxW='1440px'
            bgColor={secBg}
            minH='100vh'
        >
            <Sidebar />
            <Box pl={['300px']} h={'100%'}>
                <Navbar />
                <Box p='24px' h={'calc(100vh - 96px)'} overflowY='scroll'>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}
