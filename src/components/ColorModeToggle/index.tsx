import { Icon, useColorMode } from '@chakra-ui/react'
import { MdOutlineNightlight, MdOutlineLightMode } from 'react-icons/md'

const ColorModeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Icon
            as={colorMode === 'dark' ? MdOutlineNightlight : MdOutlineLightMode}
            onClick={toggleColorMode}
            cursor='pointer'
        />
    )
}

export default ColorModeToggle
