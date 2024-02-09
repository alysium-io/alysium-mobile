import React, { useEffect } from 'react'
import { View } from '@atomic'
import { StyleSheet } from 'react-native'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'


interface TabTogglerAnimatedBackgroundProps {
    height: number
    width: number
    tabIndex: number
}

const TabTogglerAnimatedBackground : React.FC<TabTogglerAnimatedBackgroundProps> = ({
    height,
    width,
    tabIndex
}) => {

    const left = useSharedValue<number>(1 + (tabIndex * width))

    useEffect(() => {
        left.value = withTiming(1 + (tabIndex * width), { duration: 200 })
    }, [width, tabIndex])

    const animatedStyles = useAnimatedStyle(() => {
        return {
            height: height - 2,
            left: left.value,
            width: width - 2
        }
    }, [height, width])

    return (
        <View animated style={[styles.container, animatedStyles]} backgroundColor='bg1' />
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 999,
        position: 'absolute',
        top: 1
    }
})

export default TabTogglerAnimatedBackground