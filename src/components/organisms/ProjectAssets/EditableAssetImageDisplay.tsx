import React from 'react'
import { Image } from 'react-native'
import { usePhotosAndCamera } from '@hooks'
import { TouchableOpacity } from 'react-native-gesture-handler'


interface EditableAssetImageDisplayProps {
    image: string
    imageDidSelect: (url: string) => void
}

const EditableAssetImageDisplay : React.FC<EditableAssetImageDisplayProps> = ({
    image,
    imageDidSelect
}) => {

    const { chooseImageOrTakeNewPhoto } = usePhotosAndCamera()

    const onPress = async () => {
        const url = await chooseImageOrTakeNewPhoto()
        if (url && imageDidSelect) {
            imageDidSelect(url)
        }
    }

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
            <Image
                source={{ uri: image }}
                style={{ height: '100%', resizeMode: 'cover' }}
            />
        </TouchableOpacity>
    )
}

export default EditableAssetImageDisplay