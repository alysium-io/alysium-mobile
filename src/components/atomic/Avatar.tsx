import React from 'react'
import { Image, View } from '@atomic'
import { StyleSheet } from 'react-native'
import { ContentType } from '@types'
import FastImage from 'react-native-fast-image';


interface AvatarProps {
    type: ContentType;
    image: string;
}

const Avatar : React.FC<AvatarProps> = ({
    type,
    image
}) => {

    return (
        <View style={styles.container}>
            <Image
                variant={type}
                source={{
                    uri: image,
                    priority: FastImage.priority.normal
                }}
                style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        aspectRatio: 1,
        width: '100%'
    },
    image: {
        height: '100%',
        width: '100%'
    }
})

export default Avatar