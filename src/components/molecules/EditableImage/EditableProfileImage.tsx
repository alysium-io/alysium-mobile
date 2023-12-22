import React, { useState } from 'react'
import { View, Image } from '@atomic'
import { usePhotosAndCamera } from '@hooks'
import EditIcon from './EditIcon'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'


interface EditableProfileImageProps {
    image: string
}

const EditableProfileImage : React.FC<EditableProfileImageProps> = ({
    image
}) => {

    const [imageUri, setImageUri] = useState<string>(image)

    const { chooseImageOrTakeNewPhoto } = usePhotosAndCamera()

    const onPress = async () => {
        const image = await chooseImageOrTakeNewPhoto()
        if (image) {
            setImageUri(image)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                />
                <View style={styles.iconContainer}>
                    <EditIcon />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 115,
        aspectRatio: 1
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 1000
    },
    iconContainer: {
        position: 'absolute',
        left: '72%',
        bottom: '2%'
    }
})

export default EditableProfileImage