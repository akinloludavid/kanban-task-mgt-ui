import { Box, useColorModeValue } from '@chakra-ui/react'
import { useAppContext } from '../../context/AppContext'
import { IChildren } from '../../types'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

export const PublicPageLayout = ({ children }: IChildren) => {
    return <Box>{children}</Box>
}

export const PrivatePageLayout = ({ children }: IChildren) => {
    const secBg = useColorModeValue('light.mainBg', 'dark.mainBg')
    const { showSidebar } = useAppContext()

    return (
        <Box
            mx='auto'
            position={'relative'}
            maxW='1440px'
            bgColor={secBg}
            minH='100vh'
        >
            <Sidebar />
            <Box pl={[showSidebar ? '300px' : '0px']} h={'100%'}>
                <Navbar />
                <Box p='24px' h={'calc(100vh - 96px)'} overflowY='scroll'>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}
