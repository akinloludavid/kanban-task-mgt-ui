import axios from 'axios'
import { useMutation } from 'react-query'
import { baseUrl } from '../../api/config'
import { USER_AUTH_KEY } from '../../config/config'
import { DASHBOARD } from '../../routes/pathnames'
import { ILoginPayload } from '../../types'
import { setLocalStorage } from '../../utils/helpers'
import { useCustomToast } from '../../utils/toast'

export const accountLogin = async (payload: ILoginPayload) => {
    const response = await axios.post(`${baseUrl}/auth/login`, payload)
    return response
}

export const useAccountLogin = () => {
    const { successToast } = useCustomToast()
    return useMutation({
        mutationFn: (payload: ILoginPayload) => accountLogin(payload),
        mutationKey: '/auth/login',
        onSuccess: res => {
            setLocalStorage(USER_AUTH_KEY, res.data)
            successToast('Login successful')
            window.location.href = DASHBOARD
        },
    })
}
