import React from 'react'
import { View } from '@atomic'
import settings from '../settings'
import { StyleSheet } from 'react-native'


interface ImageContainerProps {
    children?: React.ReactNode
}

const ImageContainer : React.FC<ImageContainerProps> = ({
    children
}) => {

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: settings.INNER_CONTAINER_PROFILE_IMAGE_WIDTH,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ImageContainer