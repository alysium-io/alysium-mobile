import React from 'react'
import { Image, View, Icon } from '@atomic'
import { StyleSheet } from 'react-native'
import { ContentType, Persona } from '@types'
import { IconNames } from '@svg'


const borderRadiiScheme = {
    round: 99999,
    sharp: 0,
    smooth: 5
}

const defaultAvatarImageIconScheme = {
    [ContentType.artist]: 'artist' as IconNames,
    [ContentType.host]: 'host' as IconNames,
    [ContentType.tag]: 'tag' as IconNames,
    [ContentType.location]: 'location' as IconNames,
    [ContentType.event]: 'event' as IconNames,
    [ContentType.user]: 'user' as IconNames
}

interface AvatarProps {
    contentType: ContentType | Persona
    image?: string | null
    size: string | number
    borderRadius?: 'round' | 'sharp' | 'smooth' | number
}

const Avatar : React.FC<AvatarProps> = ({
    contentType,
    image,
    size,
    borderRadius = 'round'
}) => {

    const getBorderRadius = () => {
        if (typeof borderRadius === 'string') {
            if (['round', 'sharp', 'smooth'].includes(borderRadius)) {
                return borderRadiiScheme[borderRadius]
            } else {
                throw new Error('Invalid border radius')
            }
        } else { return borderRadius }
    }

    const containerStyles = [
        styles.container,
        {
            height: size,
            width: size,
            borderRadius: getBorderRadius()
        }
    ]

    if (!image) {
        return (
            <View style={containerStyles} backgroundColor='bg2'>
                <Icon
                    name={defaultAvatarImageIconScheme[contentType]}
                    color='t2'
                    size='regular'
                />
            </View>
        )
    }

    return (
        <View style={containerStyles}>
            <Image
                source={{ uri: image }}
                style={[
                    styles.image,
                    { borderRadius: getBorderRadius() }
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: '100%',
        width: '100%'
    }
})

export default Avatar