import React from 'react'
import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle'
import { useSettings } from 'src/utils/hooks'


interface ThemeProviderProps {
    children: React.ReactNode;
}

const ThemeProvider : React.FC<ThemeProviderProps> = ({ children }) => {

    const { theme } = useSettings()

    return (
        <RestyleThemeProvider theme={theme}>
            { children }
        </RestyleThemeProvider>
    )
}

export default ThemeProvider