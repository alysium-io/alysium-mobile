import React from 'react'
import { View } from '@atomic'
import { ActivityIndicator } from 'react-native'
import { FadeIn, FadeOut } from 'react-native-reanimated'


const ButtonLoading = () => {

    return (
        <View
            animated
            entering={FadeIn}
            exiting={FadeOut}
        >
            <ActivityIndicator
                size='small'
                color='#cccccc'
            />
        </View>
    )
}

export default ButtonLoading