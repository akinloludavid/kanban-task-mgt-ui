import { useToast } from '@chakra-ui/react'

export const useCustomToast = () => {
    const toast = useToast()
    const successToast = (msg: string) => {
        toast({
            position: 'top-right',
            status: 'success',
            duration: 5000,
            title: msg,
        })
    }
    const errorToast = (msg: string) => {
        toast({
            position: 'top-right',
            status: 'error',
            duration: 5000,
            title: msg,
        })
    }
    return {
        successToast,
        errorToast,
    }
}
