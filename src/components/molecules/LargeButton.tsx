import React from 'react'
import { Vibrator, Colors } from '@etc'
import { View, Text } from '@atomic'
import { AnimatedViewEnteringProp, TimingConfig } from '@types'
import { useSettings } from '@hooks'
import {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing
} from 'react-native-reanimated'
import {
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'


const animationSettings : TimingConfig = {
    duration: 150,
    easing: Easing.inOut(Easing.ease)
}

interface LargeButtonProps {
    title: string;
    onPress: () => void;
    haptic?: boolean;
    containerProps?: React.ComponentProps<typeof View>;
    entering?: AnimatedViewEnteringProp;
    buttonType?: 'primary' | 'secondary' | 'danger';
}

const LargeButton : React.FC<LargeButtonProps> = ({
    title,
    onPress,
    haptic = false,
    containerProps,
    buttonType = 'primary'
}) => {

    const { theme } = useSettings()

    // Define the colors to be used for the button based on the `buttonType` prop
    const themeColors = {
        primary: theme.colors.accent,
        secondary: theme.colors.secondaryBg,
        danger: theme.colors.danger
    }
    const buttonPrimaryColor = themeColors[buttonType]
    const buttonSecondaryColor = Colors.darken(themeColors[buttonType], 0.2)
    const animationColors = [buttonPrimaryColor, buttonSecondaryColor]

    const animation = useSharedValue<number>(0)

    const animatedStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(animation.value, [0, 1], animationColors)
        }
    })

    const runAnimationIn = () => animation.value = withTiming(1, animationSettings)
    const runAnimationOut = () => animation.value = withTiming(0, animationSettings)

    const onPressIn = () => {
        runAnimationIn()
    }

    const onPressOut = () => {
        runAnimationOut()
        haptic && Vibrator.medium()
        onPress()
    }

    return (
        <TouchableWithoutFeedback
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
            <View
                animated
                width='100%'
                padding='m'
                borderRadius='xl'
                justifyContent='center'
                alignItems='center'
                {...containerProps}
                style={[
                    styles.container,
                    animatedStyles
                ]}
            >
                <Text variant='negativeText'>{ title }</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        
    }
})

export default LargeButton