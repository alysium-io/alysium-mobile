import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from '@atomic'


const NotchMargin = () => {
    const insets = useSafeAreaInsets()
    return <View style={{ height: insets.top, width: '100%' }} />
}

export default NotchMargin