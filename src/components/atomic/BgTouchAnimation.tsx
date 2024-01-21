import React, { useEffect } from 'react'
import { View } from '@atomic'
import { Colors } from '@etc'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { TouchableWithoutFeedback } from 'react-native'


interface BgTouchAnimationProps {
    color: string
    onPress?: () => void
    disabled?: boolean
    children?: React.ReactNode
    style?: React.ComponentProps<typeof View>['style']
    animationType?: 'default' | 'highlight'
}

const BgTouchAnimation : React.FC<BgTouchAnimationProps> = ({
    color,
    onPress,
    children,
    disabled = false,
    style,
    animationType = 'default'
}) => {

    useEffect(() => {
        animatedValue.value = withTiming(getPrimaryColor())
    }, [color])

    const getSecondaryColor = () => {
        if (animationType === 'default') {
            if (color === 'transparent') {
                return 'transparent'
            } else {
                return Colors.darken(color, 0.1)
            }
        } else {
            return color
        }
    }

    const getPrimaryColor = () => {
        if (animationType === 'default') {
            return color
        } else {
            return 'transparent'
        }
    }

    const animatedValue = useSharedValue<string>(getPrimaryColor())

    const onPressIn = () => animatedValue.value = withTiming(getSecondaryColor())
    const onPressOut = () => animatedValue.value = withTiming(getPrimaryColor())

    const animatedBgStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: animatedValue.value
        }
    }, [color])

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            disabled={disabled}
        >
            <View animated style={[ style, animatedBgStyles ]}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default BgTouchAnimation