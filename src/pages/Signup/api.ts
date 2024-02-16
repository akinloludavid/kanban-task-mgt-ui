import axios from 'axios'
import { useMutation } from 'react-query'
import { baseUrl } from '../../api/config'
import { ISignUpPayload } from '../../types'

export const createAccount = async (payload: ISignUpPayload) => {
    const response = await axios.post(`${baseUrl}/auth/signup`, payload)
    console.log(response)
    return response
}

export const useCreateAccount = () => {
    return useMutation({
        mutationFn: (payload: ISignUpPayload) => createAccount(payload),
        mutationKey: '/auth/signup',
    })
}
