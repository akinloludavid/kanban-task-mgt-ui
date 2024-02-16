import { StyleFunctionProps } from '@chakra-ui/react'

export const HeadingStyle = {
    // style object for base or default style
    baseStyle: {
        color: '#ffffff',
    },
    // styles for different sizes ("sm", "md", "lg")
    sizes: {},
    // styles for different visual variants ("outline", "solid")
    variants: {
        h1: (props: StyleFunctionProps) => ({
            fontSize: '24px',
            fontWeight: '700',
            lineHeight: '30px',
            color: props.colorMode === 'dark' ? '#fff' : 'black',
        }),
        h2: (props: StyleFunctionProps) => ({
            fontSize: '18px',
            fontWeight: '700',
            lineHeight: '23px',
            color: props.colorMode === 'dark' ? '#fff' : 'black',
        }),
        h3: {
            fontSize: '15px',
            fontWeight: '700',
            lineHeight: '19px',
            color: 'black',
        },
        h4: {
            fontSize: '12px',
            fontWeight: '500',
            lineHeight: '15px',
            color: 'black',
        },
    },
    // default values for `size` and `variant`
    defaultProps: {
        variant: 'h1',
    },
}
