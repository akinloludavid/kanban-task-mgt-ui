import { USER_AUTH_KEY } from '../config/config'
import { LOGIN_PAGE } from '../routes/pathnames'

export const getFromLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) as string)
}

export const setLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
}
export const userInfo = getFromLocalStorage(USER_AUTH_KEY)

export const getTaskObjectFromList = (columns: any[], tasks: any[]) => {
    let obj: any = {}
    columns?.forEach(el => {
        obj[el] = []
    })

    tasks?.forEach(el => {
        const status = el?.status
        if (obj[status]?.length === 0) {
            obj[el?.status] = [el]
        } else {
            obj[status]?.push(el)
        }
    })
    return obj
}

export const handleLogout = () => {
    localStorage.removeItem(USER_AUTH_KEY)
    window.location.href = LOGIN_PAGE
}

export const ItemTypes = {
    TASK: 'task',
}

export const isNavActive = (str: string) => {
    return window.location.pathname.includes(str)
}