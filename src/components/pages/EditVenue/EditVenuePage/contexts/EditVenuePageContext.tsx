import React, { createContext } from 'react'
import { EditVenueAttributes, EditVenuePageRouteProp, GetVenueResponse, ProviderProps } from '@types'
import { useRoute } from '@react-navigation/native'
import { SubmitErrorHandler, SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import { hostApiSlice } from 'src/redux/api'
import { SheetApi, useHost, useImages, useNavigation, useSheet } from '@hooks'
import { Alert } from 'react-native'
import { Asset } from 'react-native-image-picker'
import { Formatting } from '@etc'


const {
    useGetVenueDetailsQuery
} = hostApiSlice

const initialValues : EditVenueAttributes = {
    name: '',
    address: '',
    phone_number: '',
    capacity: '',
}

export type EditVenuePageContextType = {
    formMethods: UseFormReturn<EditVenueAttributes>
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>
    loadForm: () => void
    venueData: GetVenueResponse | undefined
    createLinkSheetApi: SheetApi
    confirmDelete: () => void
    changeVenueImage: (imagePickerAsset: Asset) => void
}

export const EditVenuePageContext = createContext({} as EditVenuePageContextType)

export const EditVenuePageProvider : React.FC<ProviderProps> = ({ children }) => {

    const route = useRoute<EditVenuePageRouteProp>()

    const { editVenue, deleteVenue } = useHost()
    const { uploadVenueImage } = useImages()

    const { back } = useNavigation()

    const {
        data: venueData,
        error: venueError,
        isLoading: venueIsLoading
    } = useGetVenueDetailsQuery({ venueId: route.params.venueId })

    const formMethods = useForm<EditVenueAttributes>({ defaultValues: initialValues })

    const onValid : SubmitHandler<EditVenueAttributes> = (data: EditVenueAttributes) => {
        editVenue(route.params.venueId, {
            name: data.name,
            address: data.address,
            phone_number: data.phone_number,
            capacity: Formatting.cleanStringToNumber(data.capacity)
        })
    }

    const onInvalid : SubmitErrorHandler<EditVenueAttributes> = (errors: any) => {
        console.log('Invalid')
        console.log(errors)
    }

    const loadForm = () => {
        if (venueData) {
            formMethods.reset({
                name: venueData.data.attributes.name,
                address: venueData.data.attributes.address || initialValues.name,
                phone_number: venueData.data.attributes.phone_number ? Formatting.formatPhoneNumber(venueData.data.attributes.phone_number) : initialValues.phone_number,
                capacity: venueData.data.attributes.capacity ? Formatting.formatCommaSeparatedNumber(venueData.data.attributes.capacity) : initialValues.capacity
            })
        }
    }

    const onSubmit = formMethods.handleSubmit(onValid, onInvalid)

    const createLinkSheetApi = useSheet()

    const confirmDelete = () => {
        Alert.alert(
            'Delete Venue',
            'Are you sure you want to delete this venue?',
            [
                {
                    text: 'cancel',
                    style: 'cancel'
                },
                {
                    text: 'delete', 
                    onPress: onDeleteVenue,
                    style: 'destructive'
                }
            ],
            { cancelable: false }
        )
    }

    const onDeleteVenue = () => {
        deleteVenue(route.params.venueId)
        back()
    }

    const changeVenueImage = (imagePickerAsset: Asset) => {
        if (imagePickerAsset.uri && imagePickerAsset.type && imagePickerAsset.fileName) {
            uploadVenueImage(route.params.venueId, {
                name: imagePickerAsset.fileName,
                uri: imagePickerAsset.uri,
                type: imagePickerAsset.type
            })
        }
    }

    return (
        <EditVenuePageContext.Provider
            value={{
                formMethods,
                onSubmit,
                loadForm,
                venueData,
                createLinkSheetApi,
                confirmDelete,
                changeVenueImage
            }}
        >
            {children}
        </EditVenuePageContext.Provider>
    )
}