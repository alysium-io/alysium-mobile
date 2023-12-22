import React from 'react'
import { View } from '@atomic'
import { StyleSheet } from 'react-native'
import { useAnimatedStyle, SharedValue } from 'react-native-reanimated'


interface TabToggleIndicatorProps {
    containerWidth: number;
    animatedValue: SharedValue<number>;
    totalTabs: number;
}

const TabToggleIndicator : React.FC<TabToggleIndicatorProps> = ({
    containerWidth,
    animatedValue,
    totalTabs
}) => {

    const animatedTabIndicatorStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: animatedValue.value * (containerWidth / totalTabs) }]
        }
    })

    return (
        <View
            animated
            backgroundColor='_bg1'
            style={[
                styles.tabIndicator,
                animatedTabIndicatorStyles,
                { width: containerWidth / totalTabs }
            ]}
        />
    )
}

const styles = StyleSheet.create({
    tabIndicator: {
        height: 1
    }
})

export default TabToggleIndicator