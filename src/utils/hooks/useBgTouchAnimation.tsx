import React, { useCallback } from 'react'
import { Colors } from '@etc'
import { TimingConfig } from '@types'
import { View } from '@atomic'
import { TouchableWithoutFeedback } from 'react-native'
import {
    useSharedValue,
    SharedValue,
    withTiming,
    Easing,
    useAnimatedStyle,
    interpolateColor
} from 'react-native-reanimated'


const animationSettings : TimingConfig = {
    duration: 150,
    easing: Easing.inOut(Easing.ease)
}

type TouchableProps = React.ComponentProps<typeof View> & {
    onPress?: () => void
}

type IUseBgTouchAnimation = React.ComponentProps<typeof View> & {
    animatedValue: SharedValue<number>
    animatedBgStyles: any
    onPressIn: () => void
    onPressOut: () => void
    Touchable: React.FC<TouchableProps>
}

const useBgTouchAnimation = (
    color: string,
    secondaryColor: string | undefined = undefined
) : IUseBgTouchAnimation => {

    const animationColors = [color, secondaryColor || Colors.darken(color, 0.1)]

    const animatedValue = useSharedValue<number>(0)

    const onPressIn = () => animatedValue.value = withTiming(1, animationSettings)
    const onPressOut = () => animatedValue.value = withTiming(0, animationSettings)

    const animatedBgStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(animatedValue.value, [0, 1], animationColors)
        }
    }, [color])

    const Touchable : React.FC<TouchableProps> = useCallback(
        ({ children, onPress, ...props }) => {
            return (
                <TouchableWithoutFeedback
                    onPress={onPress}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                >
                    <View {...props} animated style={[ props.style, animatedBgStyles ]}>
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            )
        },
        [animatedBgStyles]
    )

    return {
        animatedValue,
        animatedBgStyles,
        onPressIn,
        onPressOut,
        Touchable
    }

}

export default useBgTouchAnimation