import { Input as ChakraInput } from '@chakra-ui/react'

interface ButtonProps {
    /**
     * Is this the principal call to action on the page?
     */
    variant: string
    value: string

    onChange?: () => void
    placeholder: string
}

/**
 * Primary UI component for user interaction
 */
export const Input = ({ variant, value, placeholder }: ButtonProps) => {
    return (
        <ChakraInput
            variant={variant}
            placeholder={placeholder}
            value={value}
        />
    )
}
