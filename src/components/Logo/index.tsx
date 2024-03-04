import { Image, useColorMode } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { DASHBOARD } from '../../routes/pathnames'
import { userInfo } from '../../utils/helpers'

const Logo = () => {
    const { colorMode } = useColorMode()
    const navigate = useNavigate()
    return (
        <Image
            w={userInfo ? '80%' : ''}
            cursor={'pointer'}
            onClick={() => navigate(DASHBOARD)}
            src={
                colorMode === 'dark'
                    ? '/assets/logo-light.svg'
                    : '/assets/logo-dark.svg'
            }
        />
    )
}

export default Logo
