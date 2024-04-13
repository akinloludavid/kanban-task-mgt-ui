import { customTheme } from '../src/stylesConfig/theme'
import type { Preview } from '@storybook/react'
import { withChakra } from './decorators'

// .storybook/preview.js
export const parameters = {
    chakra: {
        theme: customTheme,
    },
}
export const decorators = [withChakra]
const preview: Preview = {
    parameters,
}

export default preview
