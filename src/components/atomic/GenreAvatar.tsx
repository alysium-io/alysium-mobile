import React from 'react'
import { Icon, View } from '@atomic'
import { StyleSheet } from 'react-native'
import { ContentType } from '@types';


interface GenreAvatarProps {
    color: string;
}

const GenreAvatar : React.FC<GenreAvatarProps> = ({
    color
}) => {
    return (
        <View borderRadius={ContentType.genre} style={[styles.container, { backgroundColor: '#' + color }]}>
            <Icon name='genre' size='35%' color='#fff' />
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

export default GenreAvatar