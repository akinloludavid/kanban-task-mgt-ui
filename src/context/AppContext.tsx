import { createContext, useContext, useState } from 'react'
import { IChildren } from '../types'

const initialValues = {
    currentBoard: '',
    setCurrentBoard: (e: string) => {},
    showSidebar: false,
    setShowSidebar: (e: boolean) => {},
}
const AppContext = createContext(initialValues)
export const useAppContext = () => useContext(AppContext)

const AppContextProvider = ({ children }: IChildren) => {
    const [currentBoard, setCurrentBoard] = useState('')
    const [showSidebar, setShowSidebar] = useState(false)

    const values = {
        currentBoard,
        setCurrentBoard,
        showSidebar,
        setShowSidebar,
    }
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export default AppContextProvider
