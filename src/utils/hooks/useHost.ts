import { useDispatch, useSelector } from '@redux'
import { EventAttributes, HostState, Event, ApiIdentifier } from '@types'
import hostApiSlice from 'src/redux/api/hostApiSlice'
import { hostActions } from 'src/redux/host'


const {
    useLazyGetHostDetailsQuery,
    useLazyGetEventsQuery,
    useEditEventMutation,
    useLazyCreateEventQuery,
    useDeleteEventMutation
} = hostApiSlice

export interface IUseHost {
    getHostDetails: (hostId: number) => Promise<void>
    resetHost: () => void
    host: HostState
    getEvents: () => Promise<void>
    createEvent: (attributes: Partial<EventAttributes>) => Promise<Event | null>
    editEvent: (eventId: number, attributes: EventAttributes) => Promise<void>
    deleteEvent: (eventId: number) => Promise<void>
}

const useHost = () : IUseHost => {

    const host : HostState = useSelector(state => state.host)
    const dispatch = useDispatch()

    const [ flux_getHostDetails ] = useLazyGetHostDetailsQuery()
    const [ flux_getEvents ] = useLazyGetEventsQuery()
    const [ flux_createEvent ] = useLazyCreateEventQuery()
    const [ flux_editEvent ] = useEditEventMutation()
    const [ flux_deleteEvent ] = useDeleteEventMutation()

    const getHostDetails = async (hostId: number) => {
        try {
            const { data, error } = await flux_getHostDetails({ hostId })

            if (error) {
                console.log(error)
            }
            if (data) {
                dispatch(hostActions.setHost(data.data))
            }
        } catch (err) {
            throw err
        }
    }

    const resetHost = () => {
        dispatch(hostActions.resetHost())
    }

    const getEvents = async () => {
        try {
            const { data, error } = await flux_getEvents()

            if (error) {
                console.log(error)
            }
            if (data) {
                dispatch(hostActions.setAllEvents(data.data))
            }
        } catch (err) {
            throw err
        }
    }

    const createEvent = async (attributes: Partial<EventAttributes>) : Promise<Event | null> => {
        if (host.host !== null) {
            try {
                const { data, error } = await flux_createEvent({
                    hostId: host.host.id,
                    attributes
                })
    
                if (error) console.log(error)
                if (data) {
                    dispatch(hostActions.addEvent(data.data))
                }
    
                if (!data) return null
                
                // For follow-up functionality like redirecting to the event page
                return data.data
            } catch (err) {
                throw err
            }
        }
        return null
    }

    const editEvent = async (eventId: ApiIdentifier, attributes: Partial<EventAttributes>) => {
        if (host.host !== null) {
            try {
                const { data } = await flux_editEvent({
                    hostId: host.host.id,
                    eventId,
                    attributes
                }).unwrap()
                dispatch(hostActions.editEvent(data))
            } catch (err) {
                throw err
            }
        }
    }

    const deleteEvent = async (eventId: ApiIdentifier) => {
        try {
            await flux_deleteEvent({ eventId })
            dispatch(hostActions.deleteEvent(eventId))
        } catch (err) {
            throw err
        }
    }
    
    return {
        getHostDetails,
        resetHost,
        host,
        getEvents,
        createEvent,
        editEvent,
        deleteEvent
    }
}

export default useHost