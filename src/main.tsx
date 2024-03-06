import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { customTheme } from "./stylesConfig/theme";
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import '@fontsource-variable/plus-jakarta-sans'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 10000,
            staleTime: 20,
            retry: false,
        },
    },
})
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ChakraProvider theme={customTheme}>
                    <DndProvider backend={HTML5Backend}>
                        <App />
                    </DndProvider>
                </ChakraProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>,
)
