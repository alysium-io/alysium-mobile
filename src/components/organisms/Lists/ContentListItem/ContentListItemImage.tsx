import React from 'react'
import { Avatar, View } from '@atomic'
import { StyleSheet } from 'react-native'
import { ContentType, Persona } from '@types'


const sizeScheme = {
    small: 50,
    medium: 65,
    large: 95
}

interface ContentListItemImageProps {
    image: string | null
    size: keyof typeof sizeScheme
    contentType: ContentType | Persona
    borderRadius?: 'round' | 'sharp' | 'smooth' | number
}

const ContentListItemImage : React.FC<ContentListItemImageProps> = ({
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

export default ContentListItemImage