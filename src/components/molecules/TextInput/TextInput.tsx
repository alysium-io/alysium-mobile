import React, { useEffect } from 'react'
import { View, TextInput as RNTextInput, Icon } from '@atomic'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { IconNames } from '@svg'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useTextInput, useTheme } from '@hooks'


interface TextInputProps {
    defaultValue?: string
    placeholder: string
    onChangeText: (text: string) => void
    secureTextEntry?: boolean
    onFocus?: () => void
    onBlur?: () => void
    textAlign?: 'left' | 'center'
    containerProps?: React.ComponentProps<typeof View>
    icon?: IconNames
    value?: string
    color?: string
}

const TextInput : React.FC<TextInputProps> = ({
    defaultValue,
    placeholder,
    onChangeText,
    onFocus,
    onBlur,
    containerProps,
    icon,
    value,
    color
}) => {

    useEffect(() => {
        borderColor.value = withTiming(color || theme.colors.ion)
    }, [color])

    const { theme } = useTheme()

    const {
        ref,
        focus
    } = useTextInput()

    const borderColor = useSharedValue(theme.colors.ion)

    const animatedContainerStyle = useAnimatedStyle(() => {
        return {
            borderColor: borderColor.value
        }
    })

    const _onFocus = () => {
        borderColor.value = withTiming(theme.colors.ion_dark)
        onFocus && onFocus()
    }

    const _onBlur = () => {
        borderColor.value = withTiming(theme.colors.ion)
        onBlur && onBlur()
    }

    return (
        <TouchableWithoutFeedback onPress={focus}>
            <View
                animated
                style={[
                    styles.container,
                    animatedContainerStyle
                ]}
                {...containerProps}
            >
                <View padding='m' flexDirection='row' alignItems='center'>
                    {
                        icon && (
                            <View marginRight='s'>
                                <Icon
                                    name={icon}
                                    size='regular'
                                    color='ion'
                                />
                            </View>
                        )
                    }
                    <RNTextInput
                        ref={ref}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        onChangeText={onChangeText}
                        onFocus={_onFocus}
                        onBlur={_onBlur}
                        value={value}
                        variant='paragraph-medium'
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 5
    }
})

export default TextInput