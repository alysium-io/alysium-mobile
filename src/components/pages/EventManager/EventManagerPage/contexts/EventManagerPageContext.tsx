import React, { createContext } from 'react'
import { EventsResponse, ProviderProps } from '@types'
import { SheetApi, usePersona, useSheet } from '@hooks'
import { hostApiSlice } from 'src/redux/api'


const {
    useGetHostEventsQuery
} = hostApiSlice

export type EventManagerPageContextType = {
    eventsData: EventsResponse | undefined
    eventsError: any
    eventsIsLoading: boolean
    createEventStartSheetApi: SheetApi
}

export const EventManagerPageContext = createContext({} as EventManagerPageContextType)

export const EventManagerPageProvider : React.FC<ProviderProps> = ({ children }) => {

    const { persona } = usePersona()

    const {
        data: eventsData,
        error: eventsError,
        isLoading: eventsIsLoading
    } = useGetHostEventsQuery({ hostId: persona.activePersonaId ?? undefined }, { skip: !persona.activePersonaId })

    const createEventStartSheetApi = useSheet()

    return (
        <EventManagerPageContext.Provider
            value={{
                eventsData,
                eventsError,
                eventsIsLoading,
                createEventStartSheetApi
            }}
        >
            {children}
        </EventManagerPageContext.Provider>
    )
}