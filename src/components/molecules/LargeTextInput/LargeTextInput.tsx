import React from 'react'
import { View, TextInput } from '@atomic'
import { useAnimatedState, useTextInput, useTheme } from '@hooks'
import {
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native'
import {
    interpolateColor,
    useAnimatedStyle
} from 'react-native-reanimated'


interface LargeTextInputProps {
    defaultValue?: string
    placeholder: string
    onChangeText: (text: string) => void
    secureTextEntry?: boolean
    onFocus?: () => void
    onBlur?: () => void
    textAlign?: 'left' | 'center'
}

const LargeTextInput : React.FC<LargeTextInputProps> = ({
    defaultValue,
    placeholder,
    onChangeText,
    secureTextEntry = false,
    onFocus,
    onBlur,
    textAlign = 'left'
}) => {

    const { theme, mode } = useTheme()

    const {
        ref,
        focus,
        blur
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

    return (
        <TouchableWithoutFeedback onPress={focus}>
            <View animated style={[
                styles.container,
                animatedBorderStyle
            ]}>
                <View marginHorizontal='xs' marginVertical='s' flexDirection='row' alignItems='center'>
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
        borderBottomWidth: 1
    },
    textInput: {
        fontSize: 22,
        flex: 1
    }
})

export default LargeTextInput