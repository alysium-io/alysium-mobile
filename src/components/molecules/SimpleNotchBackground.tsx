import React from 'react'
import { View } from '@atomic'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const SimpleNotchBackground = () => {

    const insets = useSafeAreaInsets()

    return (
        <View
            style={[
                styles.container,
                { height: insets.top }
            ]}
            backgroundColor='bg1'
        />
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    }
})

export default SimpleNotchBackground