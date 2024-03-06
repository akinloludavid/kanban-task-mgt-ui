import { Image, useColorMode, useMediaQuery } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { DASHBOARD } from '../../routes/pathnames'
import { userInfo } from '../../utils/helpers'

const Logo = () => {
    const { colorMode } = useColorMode()
    const [isMobile] = useMediaQuery(['(max-width: 480px)'])
    const { setCurrentBoard, currentBoard } = useAppContext()
    const navigate = useNavigate()
    return (
        <>
            {isMobile ? (
                <Image
                    onClick={() => {
                        navigate(DASHBOARD)
                        setCurrentBoard('')
                    }}
                    src='/assets/logo-mobile.svg'
                    w={currentBoard ? '10%' : '100%'}
                />
            ) : (
                <Image
                    w={userInfo ? '80%' : ''}
                    cursor={'pointer'}
                    onClick={() => {
                        navigate(DASHBOARD)
                        setCurrentBoard('')
                    }}
                    src={
                        colorMode === 'dark'
                            ? '/assets/logo-light.svg'
                            : '/assets/logo-dark.svg'
                    }
                />
            )}
        </>
    )
}

export default Logo
