import React, { createContext, useState } from 'react'
import { ProviderProps } from '@types'


export type EventCandidatesPageContextType = {
    toggleFilterId: number
    setToggleFilterId: (value: number) => void
}

export const EventCandidatesPageContext = createContext({} as EventCandidatesPageContextType)

export const EventCandidatesPageProvider : React.FC<ProviderProps> = ({ children }) => {

    const [toggleFilterId, setToggleFilterId] = useState<number>(0)

    return (
        <EventCandidatesPageContext.Provider
            value={{
                toggleFilterId,
                setToggleFilterId
            }}
        >
            {children}
        </EventCandidatesPageContext.Provider>
    )
}