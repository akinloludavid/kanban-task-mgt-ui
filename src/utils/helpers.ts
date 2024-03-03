import { USER_AUTH_KEY } from '../config/config'

export const getFromLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) as string)
}

export const setLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
}
export const userInfo = getFromLocalStorage(USER_AUTH_KEY)


export const getTaskObjectFromList = (arr: any[]) => {
    let obj: any = {}
    if (!arr) {
        return obj
    }
    arr.forEach(el => {
        const status = el?.status
        if (!obj[status]) {
            obj[el?.status] = [el]
        } else {
            obj[status].push(el)
        }
    })
    return obj
}