import { createContext, useContext, useState } from 'react'
import { IChildren } from '../types'

const initialValues = {
    currentBoard: '',
    setCurrentBoard: (e: string) => {},
}
const AppContext = createContext(initialValues)
export const useAppContext = () => useContext(AppContext)

const AppContextProvider = ({ children }: IChildren) => {
    const [currentBoard, setCurrentBoard] = useState('')

    const values = {
        currentBoard,
        setCurrentBoard,
    }
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export default AppContextProvider
