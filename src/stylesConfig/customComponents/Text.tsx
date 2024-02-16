import { StyleFunctionProps } from '@chakra-ui/react'

export const TextStyle = {
    // style object for base or default style
    baseStyle: {
        color: '#ffffff',
    },
    // styles for different sizes ("sm", "md", "lg")
    sizes: {},
    // styles for different visual variants ("outline", "solid")
    variants: {
        medium: (props: StyleFunctionProps) => ({
            fontSize: '13px',
            fontWeight: '500',
            lineHeight: '26px',
            color: props.colorMode === 'dark' ? 'white' : 'black',
        }),
        small: (props: StyleFunctionProps) => ({
            fontSize: '12px',
            fontWeight: '700',
            lineHeight: '15px',
            color: props.colorMode === 'dark' ? 'white' : 'black',
        }),
        error: {
            fontSize: '12px',
            fontWeight: '700',
            lineHeight: '15px',
            color: '#EA5555',
        },
    },
    // default values for `size` and `variant`
    defaultProps: {
        variant: 'medium',
    },
}
