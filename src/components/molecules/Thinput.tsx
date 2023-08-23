import React, { useRef } from 'react'
import { View, TextInput, Icon } from '@atomic'
import { useSettings } from '@hooks'
import { IconNames } from '@svg'
import { interpolateColor, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import { StyleSheet, TextInput as RNTextInput, TouchableWithoutFeedback } from 'react-native'


interface ThinputProps {
    icon?: IconNames;
    onFocus?: () => void;
    onBlur?: () => void;
    defaultValue?: string;
    placeholder?: string;
    onChangeText: (text: string) => void;
}

const Thinput : React.FC<ThinputProps> = ({
    icon,
    onFocus,
    onBlur,
    onChangeText,
    placeholder,
    defaultValue
}) => {

    const { theme } = useSettings()

    const textRef = useRef<RNTextInput>(null)

    const animated = useSharedValue<number>(0)

    const animatedIconStyles = useAnimatedProps(() => {
        return {
            fill: interpolateColor(animated.value, [0, 1], [theme.colors.secondaryText, theme.colors.primaryText])
        }
    }, [theme])

    const focusText = () => textRef.current?.focus()

    const _onFocus = () => {
        animated.value = withTiming(1, { duration: 250 })
        onFocus && onFocus()
    }

    const _onBlur = () => {
        animated.value = withTiming(0, { duration: 250 })
        onBlur && onBlur()
    }

    return (
        <TouchableWithoutFeedback onPress={focusText}>
            <View margin='s' style={styles.container}>
                <View
                    backgroundColor='secondaryBg'
                    paddingHorizontal='m'
                    paddingVertical='s'
                    borderRadius='m'
                    style={styles.inputContainer}
                >
                    {
                        icon && (
                            <Icon
                                name={icon}
                                animated
                                animatedPathProps={animatedIconStyles}
                                color={theme.colors.secondaryText}
                                size={13}
                            />
                        )
                    }
                    <TextInput
                        placeholder={placeholder}
                        placeholderTextColor={theme.colors.secondaryText}
                        ref={textRef}
                        onFocus={_onFocus}
                        onBlur={_onBlur}
                        variant='text'
                        cursorColor={theme.colors.cursor}
                        onChangeText={onChangeText}
                        marginLeft='s'
                        defaultValue={defaultValue}
                        autoCorrect={false}
                        autoComplete='off'
                        autoCapitalize='none'
                        keyboardAppearance={theme.colors.keyboard}
                        style={styles.textInput}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        flex: 1
    }
})

export default Thinput