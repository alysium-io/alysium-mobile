import React from 'react'
import { usePhotosAndCamera } from '@hooks'
import { Icon, View } from '@atomic'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'


interface EditableAssetImageDefaultProps {
    imageDidSelect?: (url: string) => void
}

const EditableAssetImageDefault : React.FC<EditableAssetImageDefaultProps> = ({
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
            <View style={styles.container} backgroundColor='bg2'>
                <Icon name='edit-image' size='large' color='bg1' />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    }
})

export default EditableAssetImageDefault