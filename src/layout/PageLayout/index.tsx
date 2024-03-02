import { Box } from '@chakra-ui/react'
import { IChildren } from '../../types'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

export const PublicPageLayout = ({ children }: IChildren) => {
    return <Box>{children}</Box>
}

export const PrivatePageLayout = ({ children }: IChildren) => {
    return (
        <Box mx='auto' position={'relative'} maxW='1440px'>
            <Sidebar />
            <Box pl={['300px']}>
                <Navbar />
                <Box p='16px'>{children}</Box>
            </Box>
        </Box>
    )
}
