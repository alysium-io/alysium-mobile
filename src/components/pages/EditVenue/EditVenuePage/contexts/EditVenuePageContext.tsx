import React, { createContext } from 'react'
import { EditVenueAttributes, EditVenuePageRouteProp, GetVenueResponse, ProviderProps } from '@types'
import { useRoute } from '@react-navigation/native'
import { SubmitErrorHandler, SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import { hostApiSlice } from 'src/redux/api'
import { SheetApi, useHost, useSheet } from '@hooks'


const {
    useGetVenueDetailsQuery
} = hostApiSlice

const initialValues : EditVenueAttributes = {
    name: '',
    phone_number: '',
    capacity: 0,
}

export type EditVenuePageContextType = {
    formMethods: UseFormReturn<EditVenueAttributes>
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>
    loadForm: () => void
    venueData: GetVenueResponse | undefined
    createLinkSheetApi: SheetApi
}

export const EditVenuePageContext = createContext({} as EditVenuePageContextType)

export const EditVenuePageProvider : React.FC<ProviderProps> = ({ children }) => {

    const route = useRoute<EditVenuePageRouteProp>()

    const { editVenue } = useHost()

    const {
        data: venueData,
        error: venueError,
        isLoading: venueIsLoading
    } = useGetVenueDetailsQuery({ venueId: route.params.itemId })

    const formMethods = useForm<EditVenueAttributes>({ defaultValues: initialValues })

    const onValid : SubmitHandler<EditVenueAttributes> = (data: EditVenueAttributes) => {
        editVenue(route.params.itemId, data)
    }

    const onInvalid : SubmitErrorHandler<EditVenueAttributes> = (errors: any) => {
        console.log(errors)
    }

    const loadForm = () => {
        if (venueData) {
            formMethods.reset({
                name: venueData.data.attributes.name,
                phone_number: venueData.data.attributes.phone_number,
                capacity: venueData.data.attributes.capacity
            })
        }
    }

    const onSubmit = formMethods.handleSubmit(onValid, onInvalid)

    const createLinkSheetApi = useSheet()

    return (
        <EditVenuePageContext.Provider
            value={{
                formMethods,
                onSubmit,
                loadForm,
                venueData,
                createLinkSheetApi
            }}
        >
            {children}
        </EditVenuePageContext.Provider>
    )
}