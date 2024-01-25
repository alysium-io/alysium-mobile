import React, { createContext } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { SheetApi, useHost, useNavigation, useSheet } from '@hooks'
import { Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'
import hostApiSlice from 'src/redux/api/hostApiSlice'
import {
    EditEventAttributes,
    EditEventPageRouteProp,
    EventDetailsResponse,
    GetMyVenuesResponse,
    ProviderProps
} from '@types'


const initialValues : EditEventAttributes = {
    name: '',
    venue: null
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
    formMethods: UseFormReturn<EditEventAttributes>
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>
    loadForm: () => void
    confirmDelete: () => void
    createVenueSheetApi: SheetApi
    onChangeVenue: (venueId: number) => void
}

export const EditEventPageContext = createContext({} as EditEventPageContextType)

export const EditEventPageProvider : React.FC<ProviderProps> = ({ children }) => {

    const { back } = useNavigation()
    const { editEvent, host, deleteEvent } = useHost()

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

    const formMethods = useForm<EditEventAttributes>({ defaultValues: initialValues })

    const onValid : SubmitHandler<EditEventAttributes> = (data: EditEventAttributes) => {
        editEvent(route.params.itemId, data)
    }

    const onInvalid : SubmitErrorHandler<EditEventAttributes> = (errors: any) => {
        console.log(errors)
    }

    const loadForm = () => {
        if (eventData) {
            formMethods.reset({
                name: eventData.data.attributes.name,
                venue: eventData.data.attributes.venue?.data?.id ?? null
            })
        }
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

    const onChangeVenue = (venueId: number) => {
        formMethods.setValue('venue', venueId)
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
                createVenueSheetApi,
                onChangeVenue
            }}
        >
            {children}
        </EditEventPageContext.Provider>
    )
}