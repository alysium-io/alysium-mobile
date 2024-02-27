import React, { createContext } from 'react'
import hostApiSlice from 'src/redux/api/hostApiSlice'
import { useRoute } from '@react-navigation/native'
import {
    EventDetailsResponse,
    EventPageRouteProp,
    ProviderProps
} from '@types'


const {
    useGetEventDetailsQuery
} = hostApiSlice

export type EventPageContextType = {
    eventData: EventDetailsResponse | undefined
    eventError: any
    eventIsLoading: boolean
}

export const EventPageContext = createContext({} as EventPageContextType)

export const EventPageProvider : React.FC<ProviderProps> = ({ children }) => {

    const route = useRoute<EventPageRouteProp>()

    const {
        data: eventData,
        error: eventError,
        isLoading: eventIsLoading
    } = useGetEventDetailsQuery({ eventId: route.params.eventId })

    return (
        <EventPageContext.Provider
            value={{
                eventData,
                eventError,
                eventIsLoading
            }}
        >
            {children}
        </EventPageContext.Provider>
    )
}