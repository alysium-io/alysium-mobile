import React from 'react'
import { View } from '@atomic'
import { FadeIn, FadeOut } from 'react-native-reanimated'


interface AppTransitionWrapperProps {
    children: React.ReactNode
}

const AppTransitionWrapper : React.FC<AppTransitionWrapperProps> = ({
    children
}) => {

    return (
        <View
            animated
            entering={FadeIn.duration(500).delay(500)}
            exiting={FadeOut.duration(500)}
            flex={1}
        >
            {children}
        </View>
    )
}

export default AppTransitionWrapper