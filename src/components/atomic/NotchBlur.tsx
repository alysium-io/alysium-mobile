import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurView } from '@react-native-community/blur'
import { StyleSheet } from 'react-native'
import { useSettings } from '@hooks'


const NotchBlur = () => {

    const insets = useSafeAreaInsets()

    const { theme } = useSettings()

    return (
        <BlurView
            style={[
                {
                    height: insets.top
                },
                styles.blur
            ]}
            blurType={theme.colors.notchBlur}
            blurAmount={15}
        />
    )
}

const styles = StyleSheet.create({
    blur: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    }
})

export default NotchBlur