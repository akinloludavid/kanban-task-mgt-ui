import { StyleFunctionProps } from '@chakra-ui/react'

export const FormLabel = {
    // style object for base or default style
    baseStyle: {
        color: '#ffffff',
    },
    // styles for different sizes ("sm", "md", "lg")
    sizes: {},
    // styles for different visual variants ("outline", "solid")
    variants: {
        medium: (props: StyleFunctionProps) => ({
            fontSize: '14px',
            fontWeight: '600',
            lineHeight: '26px',
            color: props.colorMode === 'dark' ? 'white' : 'black',
        }),
    },
    // default values for `size` and `variant`
    defaultProps: {
        variant: 'medium',
    },
}
