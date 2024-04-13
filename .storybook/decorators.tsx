import * as React from 'react'
import { ChakraBaseProvider } from '@chakra-ui/react'
import { customTheme } from '../src/stylesConfig/theme'

export const withChakra = Story => (
    <ChakraBaseProvider theme={customTheme}>
        <Story />
    </ChakraBaseProvider>
)
