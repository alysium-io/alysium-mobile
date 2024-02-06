import React, { createContext } from 'react'
import { ProviderProps } from '@types'


export type EventCandidatesPageContextType = {
    
}

export const EventCandidatesPageContext = createContext({} as EventCandidatesPageContextType)

export const EventCandidatesPageProvider : React.FC<ProviderProps> = ({ children }) => {

    return (
        <EventCandidatesPageContext.Provider
            value={{
                
            }}
        >
            {children}
        </EventCandidatesPageContext.Provider>
    )
}