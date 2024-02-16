import axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
} from 'axios'
import { userInfo } from '../utils/helpers'
import { baseUrl } from './config'

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
    if (statusCode === 403 && userInfo) {
        return axiosInstance(originalRequest)
    }
    return Promise.reject(error)
}

axiosInstance.interceptors.request.use(onRequest, onRequestError)
axiosInstance.interceptors.response.use(onResponse, onResponseError)

export default axiosInstance
