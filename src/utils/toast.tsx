import { useToast } from '@chakra-ui/react'

export const useCustomToast = () => {
    const toast = useToast()
    const successToast = (msg: string) => {
        toast({
            position: 'top-right',
            status: 'success',
            duration: 5000,
            title: msg,
            isClosable: true,
        })
    }
    const errorToast = (msg: string) => {
        toast({
            position: 'top-right',
            status: 'error',
            duration: 5000,
            title: msg,
            isClosable: true,
        })
    }
    const promiseToast = (msg: string, id?: string) => {
        toast({
            position: 'top-right',
            status: 'loading',
            duration: 5000,
            title: msg,
            isClosable: true,
            id,
        })
    }
        
    return {
        successToast,
        errorToast,
        promiseToast,
        toast,
    }
}
