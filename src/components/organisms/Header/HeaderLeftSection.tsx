import React from 'react'
import { View } from '@atomic'
import { Animated, StyleSheet } from 'react-native'
import { StackCardInterpolationProps } from '@react-navigation/stack'


interface HeaderLeftSectionProps {
    children?: React.ReactNode
    cardAnimationProps: StackCardInterpolationProps
}

const HeaderLeftSection : React.FC<HeaderLeftSectionProps> = ({
    children,
    cardAnimationProps
}) => {

    const animatedStyle = {
        transform: [{
            translateX: cardAnimationProps.current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0]
            })
        }]
    }

    return (
        <View paddingLeft='m' style={styles.container}>
            <Animated.View style={animatedStyle}>
                {children}
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1
    }
})

export default HeaderLeftSection