import AppContextProvider from './context/AppContext'
import { Pages } from './routes'

function App() {
    return (
        <>
            <AppContextProvider>
                <Pages />
            </AppContextProvider>
        </>
    )
}

export default App
