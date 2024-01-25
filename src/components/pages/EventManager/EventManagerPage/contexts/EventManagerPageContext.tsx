import React, { createContext } from 'react'
import { EventsResponse, ProviderProps } from '@types'
import { SheetApi, useSheet } from '@hooks'
import { hostApiSlice } from 'src/redux/api'


const {
    useGetEventsQuery
} = hostApiSlice

export type EventManagerPageContextType = {
    eventsData: EventsResponse | undefined
    eventsError: any
    eventsIsLoading: boolean
    createEventStartSheetApi: SheetApi
}

export const EventManagerPageContext = createContext({} as EventManagerPageContextType)

export const EventManagerPageProvider : React.FC<ProviderProps> = ({ children }) => {

    const {
        data: eventsData,
        error: eventsError,
        isLoading: eventsIsLoading
    } = useGetEventsQuery()

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