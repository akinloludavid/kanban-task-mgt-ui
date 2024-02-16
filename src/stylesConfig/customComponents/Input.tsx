// https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/components/input.ts

import { StyleFunctionProps } from '@chakra-ui/react'

const primary = (props: StyleFunctionProps) => ({
    field: {
        borderRadius: '4px',
        border:
            props.colorMode === 'dark'
                ? '2px solid #E4EBFA'
                : '2px solid #828FA3',
        outline: 'none',
        bgColor: 'transparent',
        fontSize: '13px',
        fontWeight: '500',
        lineHeight: '30px',
        height: '40px',
        w: ['100%'],
        color: props.colorMode === 'dark' ? '#fff' : '#000',
        _placeholder: {
            color: 'secTextColor',
            fontSize: '13px',
            fontWeight: '500',
            lineHeight: '30px',
        },
    },
})

const danger = (props: StyleFunctionProps) => ({
    field: {
        borderRadius: '4px',
        border: '2px solid #ea5555',
        outline: 'none',
        bgColor: 'transparent',
        fontSize: '13px',
        fontWeight: '500',
        lineHeight: '30px',
        height: '40px',
        w: ['100%'],
        color: '#ea5555',
        _placeholder: {
            color: 'secTextColor',
            fontSize: '13px',
            fontWeight: '500',
            lineHeight: '30px',
        },
    },
})
export const InputStyles = {
    baseStyle: {},
    variants: {
        primary,
        danger,
    },
    defaultProps: {
        variant: 'primary',
    },
}
