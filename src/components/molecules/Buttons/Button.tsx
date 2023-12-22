import React, { useMemo } from 'react'
import { View, Text } from '@atomic'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { useBgTouchAnimation, useTheme } from '@hooks'
import { FeatureColors, ThemeMode } from '@types'
import { Colors } from '@etc'


type ButtonVariants = 'filled' | 'outlined'

interface ButtonProps {
    onPress: () => void
    text: string
    variant: ButtonVariants
    color_variant: 'default' | keyof FeatureColors
}

const FilledButton : React.FC<ButtonProps> = ({
    onPress,
    variant,
    color_variant,
    text
}) => {

    const { getRawColor, mode } = useTheme()

    const colorScheme = useMemo(() => {
        if (mode === ThemeMode.dark) {
            return {
                background: color_variant === 'default' ? getRawColor('white') : getRawColor(color_variant),
                text: color_variant === 'default' ? 'black' : Colors.getContrastTextColor(getRawColor(color_variant))
            }
        } else {
            return {
                background: color_variant === 'default' ? getRawColor('black') : getRawColor(color_variant),
                text: color_variant === 'default' ? 'white' : Colors.getContrastTextColor(getRawColor(color_variant))
            }
        }
    }, [mode, variant, color_variant])

    const {
        onPressIn,
        onPressOut,
        animatedBgStyles
    } = useBgTouchAnimation(colorScheme.background)

    return (
        <TouchableWithoutFeedback onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
            <View
                animated
                style={[
                    styles.container,
                    animatedBgStyles
                ]}
            >
                <Text variant='paragraph-small-bold' color={colorScheme.text}>{text}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const OutlinedButton : React.FC<ButtonProps> = ({
    onPress,
    variant,
    color_variant,
    text
}) => {

    const { getRawColor, mode } = useTheme()

    const colorScheme = useMemo(() => {
        if (mode === ThemeMode.dark) {
            return {
                border: color_variant === 'default' ? getRawColor('white') : getRawColor(color_variant),
                text: color_variant === 'default' ? 'white' : color_variant
            }
        } else {
            return {
                border: color_variant === 'default' ? getRawColor('black') : getRawColor(color_variant),
                text: color_variant === 'default' ? 'black' : color_variant
            }
        }
    }, [mode, variant, color_variant])

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View
                animated
                style={[
                    styles.container,
                    {
                        borderColor: colorScheme.border,
                        borderWidth: 1
                    }
                ]}
            >
                <Text variant='paragraph-small-bold' color={colorScheme.text}>{text}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const Button : React.FC<Partial<ButtonProps>> = ({
    onPress = () => console.log('I am a button :)'),
    text = 'Press Me',
    variant = 'filled',
    color_variant = 'default'
}) => {

    if (variant === 'outlined') {
        return <OutlinedButton onPress={onPress} variant={variant} color_variant={color_variant} text={text} />
    }

    if (variant === 'filled') {
        return <FilledButton onPress={onPress} variant={variant} color_variant={color_variant} text={text} />
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 13
    }
})

export default Button