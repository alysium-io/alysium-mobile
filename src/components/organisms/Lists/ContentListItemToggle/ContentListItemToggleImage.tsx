import React from 'react'
import { Avatar, View } from '@atomic'
import { StyleSheet } from 'react-native'
import { ContentType } from '@types'


const sizeScheme = {
    small: 50,
    medium: 65,
    large: 95
}

interface ContentListItemToggleImageProps {
    image: string | null
    size: keyof typeof sizeScheme
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
            { height: sizeScheme[size] }
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