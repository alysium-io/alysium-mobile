import React, { createContext } from 'react'
import { ProviderProps } from '@types'
import { useImages } from '@hooks'
import { Asset } from 'react-native-image-picker'


export type ProfilePageContextType = {
    changeProfileImage: (imagePickerAsset: Asset) => void
}

export const ProfilePageContext = createContext({} as ProfilePageContextType)

export const ProfilePageProvider : React.FC<ProviderProps> = ({ children }) => {

    const { uploadUserProfileImage } = useImages()

    const changeProfileImage = (imagePickerAsset: Asset) => {
        if (imagePickerAsset.uri && imagePickerAsset.type && imagePickerAsset.fileName) {
            uploadUserProfileImage({
                uri: imagePickerAsset.uri,
                type: imagePickerAsset.type,
                name: imagePickerAsset.fileName
            })
        }
    }

    return (
        <ProfilePageContext.Provider
            value={{
                changeProfileImage
            }}
        >
            {children}
        </ProfilePageContext.Provider>
    )
}