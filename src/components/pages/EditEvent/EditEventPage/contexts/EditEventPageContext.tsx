import React, { createContext } from 'react'
import { EditEventPageRouteProp, EventAttributes, EventDetailsResponse, GetMyVenuesResponse, ProviderProps } from '@types'
import { SubmitErrorHandler, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { useRoute } from '@react-navigation/native'
import hostApiSlice from 'src/redux/api/hostApiSlice'
import { SheetApi, useHost, useNavigation, useSheet } from '@hooks'
import { Alert } from 'react-native'


const initialValues : EventAttributes = {
    name: '',
    date: '',
    address: '',
    image: '',
    color: ''
}

const {
    useGetEventDetailsQuery,
    useGetVenuesQuery
} = hostApiSlice

export type EditEventPageContextType = {
    eventData: EventDetailsResponse | undefined
    eventError: any
    eventIsLoading: boolean
    venuesData: GetMyVenuesResponse | undefined
    venuesError: any
    venuesIsLoading: boolean
    formMethods: UseFormReturn<EventAttributes>
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>
    loadForm: () => void
    confirmDelete: () => void
    createVenueSheetApi: SheetApi
}

export const EditEventPageContext = createContext({} as EditEventPageContextType)

export const EditEventPageProvider : React.FC<ProviderProps> = ({ children }) => {

    const { back } = useNavigation()
    const { deleteEvent, editEvent, host } = useHost()

    const route = useRoute<EditEventPageRouteProp>()

    const createVenueSheetApi = useSheet()

    const {
        data: eventData,
        error: eventError,
        isLoading: eventIsLoading
    } = useGetEventDetailsQuery({ eventId: route.params.itemId })

    const {
        data: venuesData,
        error: venuesError,
        isLoading: venuesIsLoading
    } = useGetVenuesQuery({ hostId: host.host?.id }, { skip: host.host === undefined })

    const formMethods = useForm<EventAttributes>({ defaultValues: initialValues })

    const onValid : SubmitHandler<EventAttributes> = (data: EventAttributes) => {
        editEvent(route.params.itemId, data)
    }

    const onInvalid : SubmitErrorHandler<EventAttributes> = (errors: any) => {
        console.log(errors)
    }

    const loadForm = () => {
        if (eventData) formMethods.reset(eventData.data.attributes)
    }

    const onSubmit = formMethods.handleSubmit(onValid, onInvalid)

    const confirmDelete = () => {
        Alert.alert(
            'Delete Event',
            'Are you sure you want to delete this event?',
            [
                {
                    text: 'cancel',
                    style: 'cancel'
                },
                { 
                    text: 'delete', 
                    onPress: onDeleteEvent,
                    style: 'destructive'
                }
            ],
            { cancelable: false }
        )
    }

    const onDeleteEvent = () => {
        deleteEvent(route.params.itemId)
        back()
    }

    return (
        <EditEventPageContext.Provider
            value={{
                eventData,
                eventError,
                eventIsLoading,
                venuesData,
                venuesError,
                venuesIsLoading,
                formMethods,
                onSubmit,
                loadForm,
                confirmDelete,
                createVenueSheetApi
            }}
        >
            {children}
        </EditEventPageContext.Provider>
    )
}