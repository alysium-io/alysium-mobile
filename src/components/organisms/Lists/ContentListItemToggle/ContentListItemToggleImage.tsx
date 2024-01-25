import React from 'react'
import { Avatar, View } from '@atomic'
import { StyleSheet } from 'react-native'
import { ContentType } from '@types'
import { imageSizeScheme } from './shared'


interface ContentListItemToggleImageProps {
    image: string | null
    size: keyof typeof imageSizeScheme
    contentType: ContentType
    borderRadius?: 'round' | 'sharp' | 'smooth' | number
}

const ContentListItemToggleImage : React.FC<ContentListItemToggleImageProps> = ({
    image,
    contentType,
    size = 'medium',
    borderRadius = 'round'
}) => {

    return (
        <View style={[
            styles.container,
            { height: imageSizeScheme[size] }
        ]}>
            <Avatar
                contentType={contentType}
                borderRadius={borderRadius}
                image={image}
                size='100%'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        aspectRatio: 1
    }
})

export default ContentListItemToggleImage