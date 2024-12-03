import { Text, View } from '@atomic'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const QRCode = () => {
    const { top } = useSafeAreaInsets()
    return (
        <View style={{ marginTop: top }}>
            <Text>Hello World</Text>
        </View>
    )
}

export default QRCode