import { Image, useColorMode } from '@chakra-ui/react'

const Logo = () => {
    const { colorMode } = useColorMode()

    return (
        <Image
            // w='60%'
            cursor={'pointer'}
            src={
                colorMode === 'dark'
                    ? '/assets/logo-light.svg'
                    : '/assets/logo-dark.svg'
            }
        />
    )
}

export default Logo
