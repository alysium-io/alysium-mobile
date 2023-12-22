import React from 'react'
import { View, Text } from '@atomic'
import { StyleSheet } from 'react-native'


interface ProfileCarouselHeaderProps {
    title: string;
}

const ProfileCarouselHeader : React.FC<ProfileCarouselHeaderProps> = ({
    title
}) => {

    return (
        <View style={styles.container} marginBottom='m'>
            <Text variant='h5'>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    }
})

export default ProfileCarouselHeader