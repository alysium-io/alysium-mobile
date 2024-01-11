import { useDispatch, useSelector } from '@redux'
import { EventAttributes, HostState } from '@types'
import hostApiSlice from 'src/redux/api/hostApiSlice'
import { hostActions } from 'src/redux/host'


const {
    useLazyGetHostDetailsQuery,
    useLazyGetHostEventsQuery,
    useLazyEditHostEventQuery,
    useLazyCreateHostEventQuery
} = hostApiSlice

export interface IUseHost {
    getHostDetails: (hostId: number) => Promise<void>
    getEvents: () => Promise<void>
    createEvent: (attributes: EventAttributes) => Promise<void>
    editEvent: (eventId: number, attributes: EventAttributes) => Promise<void>
    host: HostState
}

const useHost = () : IUseHost => {

    const host : HostState = useSelector(state => state.host)
    const dispatch = useDispatch()

    const [ flux_getHostDetails ] = useLazyGetHostDetailsQuery()
    const [ flux_getHostEvents ] = useLazyGetHostEventsQuery()
    const [ flux_createHostEvent ] = useLazyCreateHostEventQuery()
    const [ flux_editHostEvent ] = useLazyEditHostEventQuery()

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

    const getEvents = async () => {
        try {
            const { data, error } = await flux_getHostEvents()

            if (error) {
                console.log(error)
            }
            if (data) {
                dispatch(hostActions.setHostEvents(data.data))
            }
        } catch (err) {
            throw err
        }
    }

    const createEvent = async (attributes: EventAttributes) => {
        try {
            const { data, error } = await flux_createHostEvent({ attributes })

            if (error) {
                console.log(error)
            }
            if (data) {
                dispatch(hostActions.addEvent(data.data))
            }
        } catch (err) {
            throw err
        }
    }

    const editEvent = async (eventId: number, attributes: EventAttributes) => {
        try {
            const { data, error } = await flux_editHostEvent({
                id: eventId,
                attributes
            })

            if (error) {
                console.log(error)
            }
            if (data) {
                dispatch(hostActions.editEvent(data.data))
            }
        } catch (err) {
            throw err
        }
    }
    
    return {
        getHostDetails,
        getEvents,
        createEvent,
        editEvent,
        host
    }
}

export default useHost