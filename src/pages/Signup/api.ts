import axios from 'axios'
import { useMutation } from 'react-query'
import { baseUrl } from '../../api/config'
import { USER_AUTH_KEY } from '../../config/config'
import { DASHBOARD } from '../../routes/pathnames'
import { ISignUpPayload } from '../../types'
import { setLocalStorage } from '../../utils/helpers'

export const createAccount = async (payload: ISignUpPayload) => {
    const response = await axios.post(`${baseUrl}/auth/signup`, payload)
    return response.data?.data || response.data
}

export const useCreateAccount = () => {
    return useMutation({
        mutationFn: (payload: ISignUpPayload) => createAccount(payload),
        mutationKey: '/auth/signup',
        onSuccess: res => {
            setLocalStorage(USER_AUTH_KEY, res)
            window.location.href = DASHBOARD
        },
    })
}
