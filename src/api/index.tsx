import axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
} from 'axios'
import { USER_AUTH_KEY } from '../config/config'
import { LOGIN_PAGE } from '../routes/pathnames'
import { userInfo } from '../utils/helpers'
import { baseUrl } from './config'
console.log(userInfo)
const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
    },
})

const onRequest = (
    request: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
    request.headers!.Authorization = `Bearer ${userInfo.token}` || ''
    return request
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response
}

const onResponseError = async (error: AxiosError) => {
    const statusCode = error.response!.status
    const originalRequest: any = error.config
    if (statusCode === 401 && userInfo) {
        // localStorage.removeItem(USER_AUTH_KEY)
        // window.location.href = LOGIN_PAGE
        return axiosInstance(originalRequest)
    }
    return Promise.reject(error)
}

axiosInstance.interceptors.request.use(onRequest, onRequestError)
axiosInstance.interceptors.response.use(onResponse, onResponseError)

export default axiosInstance
