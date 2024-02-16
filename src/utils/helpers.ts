import { USER_AUTH_KEY } from '../config/config'

export const getFromLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) as string)
}

export const userInfo = getFromLocalStorage(USER_AUTH_KEY)
