import { Button as ChakraButton } from '@chakra-ui/react'
import React from 'react'

interface ButtonProps {
    /**
     * Is this the principal call to action on the page?
     */
    variant: string
    /**
     * What background color to use
     */
    /**
     * How wide should the button be?
     */
    width: 'fit-content' | 'full' | `${number}px`
    /**
     * Button contents
     */
    children: React.ReactNode
    /**
     * Optional click handler
     */
    onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ variant, width, children }: ButtonProps) => {
    return (
        <ChakraButton variant={variant} width={width}>
            {children}
        </ChakraButton>
    )
}
