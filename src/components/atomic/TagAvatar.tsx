import React from 'react'
import { Icon, View } from '@atomic'
import { StyleSheet } from 'react-native'
import { ContentType } from '@types'
import { useTheme } from '@hooks'


interface TagAvatarProps {
    color: string | null;
}

const TagAvatar : React.FC<TagAvatarProps> = ({
    color
}) => {

    const { theme } = useTheme()

    const backgroundColor = color === null ? theme.colors.bg2 : '#' + color

    return (
        <View borderRadius={ContentType.tag} style={[styles.container, { backgroundColor }]}>
            <Icon name='tag' size='35%' color='#fff' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default TagAvatar