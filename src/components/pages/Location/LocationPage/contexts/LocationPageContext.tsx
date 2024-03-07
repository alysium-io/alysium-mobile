import React, { createContext } from 'react'
import { ProviderProps } from '@types'


export type LocationPageContextType = {
    
}

export const LocationPageContext = createContext({} as LocationPageContextType)

export const LocationPageContextProvider : React.FC<ProviderProps> = ({ children }) => {

    return (
        <LocationPageContext.Provider value={{
            
        }}>
            {children}
        </LocationPageContext.Provider>
    )
}