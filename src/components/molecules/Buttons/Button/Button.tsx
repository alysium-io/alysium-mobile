import React, { useMemo } from 'react'
import { View, Text, Icon } from '@atomic'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { useBgTouchAnimation, useTheme } from '@hooks'
import { FeatureColors, ThemeMode } from '@types'
import { Colors } from '@etc'
import { IconNames } from '@svg'


type ButtonVariants = 'filled' | 'outlined'

interface ButtonProps {
    onPress: () => void
    text: string
    variant: ButtonVariants
    color_variant: 'default' | keyof FeatureColors
    containerProps?: React.ComponentProps<typeof View>
    icon?: IconNames
}

const FilledButton : React.FC<ButtonProps> = ({
    onPress,
    variant,
    color_variant,
    text,
    containerProps,
    icon
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
                {...containerProps}
                style={[
                    styles.container,
                    animatedBgStyles
                ]}
            >
                <Text variant='paragraph-small-bold' color={colorScheme.text}>{text}</Text>
                {
                    icon && (
                        <View marginLeft='s'>
                            <Icon name={icon} color={colorScheme.text} size='small' />
                        </View>
                    )
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const OutlinedButton : React.FC<ButtonProps> = ({
    onPress,
    variant,
    color_variant,
    text,
    containerProps,
    icon
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
                {...containerProps}
                style={[
                    styles.container,
                    {
                        borderColor: colorScheme.border,
                        borderWidth: 1
                    }
                ]}
            >
                <Text variant='paragraph-small-bold' color={colorScheme.text}>{text}</Text>
                {
                    icon && (
                        <View marginLeft='s'>
                            <Icon name={icon} color={colorScheme.text} size='small' />
                        </View>
                    )
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const Button : React.FC<Partial<ButtonProps>> = ({
    onPress = () => console.log('I am a button :)'),
    text = 'Press Me',
    variant = 'filled',
    color_variant = 'default',
    containerProps,
    icon
}) => {

    if (variant === 'outlined') {
        return <OutlinedButton onPress={onPress} variant={variant} color_variant={color_variant} text={text} containerProps={containerProps} icon={icon} />
    }

    if (variant === 'filled') {
        return <FilledButton onPress={onPress} variant={variant} color_variant={color_variant} text={text} containerProps={containerProps} icon={icon} />
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