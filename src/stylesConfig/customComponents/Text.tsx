export const TextStyle = {
    // style object for base or default style
    baseStyle: {
        color: '#ffffff',
    },
    // styles for different sizes ("sm", "md", "lg")
    sizes: {},
    // styles for different visual variants ("outline", "solid")
    variants: {
        medium: {
            fontSize: '13px',
            fontWeight: '500',
            lineHeight: '26px',
        },
        small: {
            fontSize: '12px',
            fontWeight: '700',
            lineHeight: '15px',
        },
    },
    // default values for `size` and `variant`
    defaultProps: {
        variant: 'medium',
    },
}
