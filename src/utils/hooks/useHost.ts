import { useDispatch, useSelector } from '@redux'
import { EventAttributes, HostState, Event, ApiIdentifier } from '@types'
import hostApiSlice from 'src/redux/api/hostApiSlice'
import { hostActions } from 'src/redux/host'


const {
    useLazyGetHostDetailsQuery,
    useLazyGetEventsQuery,
    useEditEventMutation,
    useLazyCreateEventQuery,
    useDeleteEventMutation,
    useLazyGetVenuesQuery,
    useCreateVenueMutation
} = hostApiSlice

export interface IUseHost {
    getHostDetails: (hostId: number) => Promise<void>
    resetHost: () => void
    host: HostState
    getEvents: () => Promise<void>
    createEvent: (attributes: Partial<EventAttributes>) => Promise<Event | null>
    editEvent: (eventId: number, attributes: EventAttributes) => Promise<void>
    deleteEvent: (eventId: number) => Promise<void>
    getVenues: (hostId: number) => Promise<void>
    createVenue: (name: string) => Promise<void>
}

const useHost = () : IUseHost => {

    const host : HostState = useSelector(state => state.host)
    const dispatch = useDispatch()

    const [ flux_getHostDetails ] = useLazyGetHostDetailsQuery()
    const [ flux_getEvents ] = useLazyGetEventsQuery()
    const [ flux_createEvent ] = useLazyCreateEventQuery()
    const [ flux_editEvent ] = useEditEventMutation()
    const [ flux_deleteEvent ] = useDeleteEventMutation()
    const [ flux_getVenues ] = useLazyGetVenuesQuery()
    const [ flux_createVenue ] = useCreateVenueMutation()

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
        try {
            const { data, error } = await flux_createEvent({ attributes })

            if (error) console.log(error)
            if (!data) return null

            if (data) {
                dispatch(hostActions.addEvent(data.data))
            }
            
            return data.data
        } catch (err) {
            throw err
        }
    }

    const editEvent = async (eventId: ApiIdentifier, attributes: Partial<EventAttributes>) => {
        try {
            const { data } = await flux_editEvent({ eventId, attributes }).unwrap()
            dispatch(hostActions.editEvent(data))
        } catch (err) {
            throw err
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

    const getVenues = async (hostId: number) => {
        try {
            const { data, error } = await flux_getVenues({ hostId })

            if (error) {
                console.log(error)
            }

            if (data) {
                dispatch(hostActions.setAllVenues(data.data))
            }
        } catch (err) {
            throw err
        }
    }

    const createVenue = async (name: string) => {
        try {
            if (host.host !== null) {
                const { data } = await flux_createVenue({ hostId: host.host.id, name }).unwrap()
                dispatch(hostActions.addVenue(data))
            }
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
        deleteEvent,
        getVenues,
        createVenue
    }
}

export default useHost