import React, { createContext } from 'react'
import { ProviderProps } from '@types'
import { SheetApi, useSheet } from '@hooks'


export type EventManagerPageContextType = {
    createEventStartSheetApi: SheetApi
}

export const EventManagerPageContext = createContext({} as EventManagerPageContextType)

export const EventManagerPageProvider : React.FC<ProviderProps> = ({ children }) => {

    const createEventStartSheetApi = useSheet()

    return (
        <EventManagerPageContext.Provider
            value={{
                createEventStartSheetApi
            }}
        >
            {children}
        </EventManagerPageContext.Provider>
    )
}