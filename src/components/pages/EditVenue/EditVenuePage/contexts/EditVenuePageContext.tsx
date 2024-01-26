import React, { createContext } from 'react'
import { ProviderProps } from '@types'


export type EditVenuePageContextType = {
    
}

export const EditVenuePageContext = createContext({} as EditVenuePageContextType)

export const EditVenuePageProvider : React.FC<ProviderProps> = ({ children }) => {

    return (
        <EditVenuePageContext.Provider
            value={{
                
            }}
        >
            {children}
        </EditVenuePageContext.Provider>
    )
}