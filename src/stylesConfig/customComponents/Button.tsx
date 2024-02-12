export const ButtonStyles = {
    // style object for base or default style
    baseStyle: {
        outline: 'none',
        _focus: { boxShadow: 'none' },
    },
    // styles for different sizes ("sm", "md", "lg")
    sizes: {},
    // styles for different visual variants ("outline", "solid")
    variants: {
        largePrimary: (props: any) => ({
            bg: 'pryColor',
            fontSize: '15px',
            fontWeight: '700',
            lineHeight: '19px',
            borderRadius: '24px',
            color: 'white',
            width: '255px',
            height: '48px',
            _hover: {
                bg: '#A8A4FF',
            },
            '@media (max-width:480px)': {
                width: 'full',
            },
        }),
        primary: (props: any) => ({
            bg: 'pryColor',
            fontSize: '15px',
            fontWeight: '700',
            lineHeight: '19px',
            borderRadius: '20px',
            color: 'white',
            width: '255px',
            height: '40px',
            _hover: {
                bg: '#A8A4FF',
            },
            '@media (max-width:480px)': {
                width: 'full',
            },
        }),
        secondary: (props: any) => ({
            bg: 'secBtnColor',
            fontSize: '15px',
            fontWeight: '700',
            lineHeight: '19px',
            borderRadius: '20px',
            color: 'pryColor',
            width: '255px',
            height: '40px',
            _hover: {
                bg: 'secBtnHoverColor',
            },
            '@media (max-width:480px)': {
                width: 'full',
            },
        }),
        danger: (props: any) => ({
            bg: 'danger',
            fontSize: '15px',
            fontWeight: '700',
            lineHeight: '19px',
            borderRadius: '20px',
            color: 'white',
            width: '255px',
            height: '40px',
            _hover: {
                bg: 'btnDangerHover',
            },
            '@media (max-width:480px)': {
                width: 'full',
            },
        }),
    },
    // default values for `size` and `variant`
    defaultProps: {
        variant: 'primary',
    },
}
