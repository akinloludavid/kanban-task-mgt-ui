import { Box } from '@chakra-ui/react'
import { IChildren } from '../../types'

export const PublicPageLayout = ({ children }: IChildren) => {
    return <Box>{children}</Box>
}

export const PrivatePageLayout = ({ children }: IChildren) => {
    return <Box>{children}</Box>
}
