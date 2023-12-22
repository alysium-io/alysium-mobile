import React, { createContext } from 'react'
import { ProviderProps } from '@types'
import { SharedValue, useSharedValue } from 'react-native-reanimated'


export type ThemeContextType = {
    animatedValue: SharedValue<number>
}

export const ThemeContext = createContext({} as ThemeContextType)

export const ThemeProvider : React.FC<ProviderProps> = ({ children }) => {

    const animatedValue = useSharedValue<number>(0)

    return (
        <ThemeContext.Provider
            value={{
                animatedValue
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}