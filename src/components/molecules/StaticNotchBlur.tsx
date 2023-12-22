import React from 'react'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurView } from '@react-native-community/blur'
import { StyleSheet } from 'react-native'
import { useTheme } from '@hooks'


const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const StaticNotchBlur = () => {

    const insets = useSafeAreaInsets()

    const { theme } = useTheme()

    return (
        <AnimatedBlurView
            style={[
                { height: insets.top },
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
        left: 0,
        zIndex: 999
    }
})

export default StaticNotchBlur