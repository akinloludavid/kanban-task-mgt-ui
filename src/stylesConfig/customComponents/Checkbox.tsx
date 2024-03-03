import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'
import { StyleFunctionProps } from '@chakra-ui/react'
import { colors } from './colors'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
    control: (props: StyleFunctionProps) =>
        defineStyle({
            bg:
                props.colorMode === 'dark'
                    ? colors.dark.secBg
                    : colors.light.secBg,
        }),

    track: {},
})
export const checkboxTheme = defineMultiStyleConfig({ baseStyle })
