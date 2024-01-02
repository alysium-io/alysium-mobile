import React from 'react'
import { View, TextInput, Icon } from '@atomic'
import { useAnimatedState, useTextInput, useTheme } from '@hooks'
import {
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native'
import {
    interpolateColor,
    useAnimatedProps,
    useAnimatedStyle
} from 'react-native-reanimated'
import { IconNames } from '@svg'


interface LargeTextInputProps {
    defaultValue?: string
    placeholder: string
    onChangeText: (text: string) => void
    secureTextEntry?: boolean
    onFocus?: () => void
    onBlur?: () => void
    textAlign?: 'left' | 'center'
    containerProps?: React.ComponentProps<typeof View>
    icon?: IconNames
}

const LargeTextInput : React.FC<LargeTextInputProps> = ({
    defaultValue,
    placeholder,
    onChangeText,
    secureTextEntry = false,
    onFocus,
    onBlur,
    textAlign = 'left',
    containerProps,
    icon
}) => {

    const { theme, mode } = useTheme()

    const {
        ref,
        focus
    } = useTextInput()

    const {
        state,
        setState
    } = useAnimatedState(0, { duration: 100 })

    const _onBlur = () => {
        setState(0)
        onBlur && onBlur()
    }

    const _onFocus = () => {
        setState(1)
        onFocus && onFocus()
    }

    const animatedBorderStyle = useAnimatedStyle(() => {
        return {
            borderBottomColor: interpolateColor(state.value, [0, 1], [theme.colors.t3, theme.colors.t1])
        }
    }, [mode])

    const animatedIconStyle = useAnimatedProps(() => {
        return {
            fill: interpolateColor(state.value, [0, 1], [theme.colors.t3, theme.colors.t1])
        }
    }, [mode])

    return (
        <TouchableWithoutFeedback onPress={focus}>
            <View animated {...containerProps} style={[
                styles.container,
                animatedBorderStyle
            ]}>
                {
                    icon && (
                        <View marginRight='m'>
                            <Icon
                                name={icon}
                                size='regular'
                                animated
                                animatedPathProps={animatedIconStyle}
                            />
                        </View>
                    )
                }
                <View marginHorizontal='xs' marginVertical='s' flexDirection='row' alignItems='center' flex={1}>
                    <TextInput
                        ref={ref}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        placeholderTextColor={theme.colors.t2}
                        variant='section-header-1'
                        onFocus={_onFocus}
                        onBlur={_onBlur}
                        onChangeText={onChangeText}
                        secureTextEntry={secureTextEntry}
                        keyboardAppearance={mode}
                        textAlign={textAlign}
                        style={[
                            styles.textInput,
                            {
                                color: theme.colors.t1
                            }
                        ]}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        fontSize: 22,
        flex: 1
    }
})

export default LargeTextInput