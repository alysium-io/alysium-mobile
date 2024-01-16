import React, { createContext } from 'react'
import { EditEventPageRouteProp, EventAttributes, EventDetailsResponse, ProviderProps } from '@types'
import { SubmitErrorHandler, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { useRoute } from '@react-navigation/native'
import hostApiSlice from 'src/redux/api/hostApiSlice'
import { useHost, useNavigation } from '@hooks'
import { Alert } from 'react-native'


const initialValues : EventAttributes = {
    name: '',
    date: '',
    address: '',
    image: '',
    color: ''
}

const {
    useGetEventDetailsQuery
} = hostApiSlice

export type EditEventPageContextType = {
    data: EventDetailsResponse | undefined
    isLoading: boolean
    error: any
    formMethods: UseFormReturn<EventAttributes>
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>
    loadForm: () => void
    confirmDelete: () => void
}

export const EditEventPageContext = createContext({} as EditEventPageContextType)

export const EditEventPageProvider : React.FC<ProviderProps> = ({ children }) => {

    const { back } = useNavigation()
    const { deleteEvent, editEvent } = useHost()

    const route = useRoute<EditEventPageRouteProp>()

    const { data, error, isLoading } = useGetEventDetailsQuery({ eventId: route.params.itemId })

    const formMethods = useForm<EventAttributes>({ defaultValues: initialValues })

    const onValid : SubmitHandler<EventAttributes> = (data: EventAttributes) => {
        editEvent(route.params.itemId, data)
    }

    const onInvalid : SubmitErrorHandler<EventAttributes> = (errors: any) => {
        console.log(errors)
    }

    const loadForm = () => {
        if (data) {
            formMethods.reset(data.data.attributes)
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

    return (
        <EditEventPageContext.Provider
            value={{
                data,
                isLoading,
                error,
                formMethods,
                onSubmit,
                loadForm,
                confirmDelete
            }}
        >
            {children}
        </EditEventPageContext.Provider>
    )
}