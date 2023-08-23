import React, { useRef } from 'react'
import { View, Icon, TextInput } from '@atomic'
import { useSettings } from '@hooks'
import { AnimatedViewEnteringProp } from '@types'
import { IconNames } from '@svg'
import {
    KeyboardTypeOptions,
    TouchableWithoutFeedback,
    StyleSheet,
    TextInput as RNTextInput
} from 'react-native'
import {
    useSharedValue,
    useAnimatedStyle,
    interpolateColor,
    withTiming,
    useAnimatedProps
} from 'react-native-reanimated'


interface LargeInputProps {
    defaultValue?: string;
    icon?: IconNames;
    containerProps?: React.ComponentProps<typeof View>;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions | undefined;
    secureTextEntry?: boolean | undefined;
    onFocus?: () => void;
    onBlur?: () => void;
    entering?: AnimatedViewEnteringProp;
    onChangeText: (text: string) => void;
}

const LargeInput : React.FC<LargeInputProps> = ({
    defaultValue,
    icon = undefined,
    placeholder,
    keyboardType = 'default',
    secureTextEntry = false,
    onFocus,
    onBlur,
    onChangeText,
    containerProps
}) => {

    const { theme } = useSettings()

    const textRef = useRef<RNTextInput>(null)

    const animated = useSharedValue<number>(0)

    const animatedContainerStyles = useAnimatedStyle(() => {
        return {
            borderColor: interpolateColor(animated.value, [0, 1], [theme.colors.primaryBg, theme.colors.accent900])
        }
    }, [theme])

    const animatedIconStyles = useAnimatedProps(() => {
        return {
            stroke: interpolateColor(animated.value, [0, 1], [theme.colors.secondaryText, theme.colors.primaryText])
        }
    }, [theme])

    const focusText = () => textRef.current?.focus()

    const _onFocus = () => {
        animated.value = withTiming(1, { duration: 150 })
        onFocus && onFocus()
    }

    const _onBlur = () => {
        animated.value = withTiming(0, { duration: 150 })
        onBlur && onBlur()
    }

    return (
        <TouchableWithoutFeedback onPress={focusText}>
            <View
                animated
                variant='secondary'
                padding='m'
                borderRadius='xl'
                flexDirection='row'
                alignItems='center'
                width='100%'
                {...containerProps}
                style={[
                    styles.container,
                    animatedContainerStyles
                ]}
            >
                {
                    icon && (
                        <View style={styles.iconContainer}>
                            <Icon
                                name={icon}
                                animated
                                animatedPathProps={animatedIconStyles}
                                color={theme.colors.secondaryText}
                                size={16}
                            />
                        </View>
                    )
                }
                <View style={styles.inputContainer}>
                    <TextInput
                        ref={textRef}
                        defaultValue={defaultValue}
                        onChangeText={onChangeText}
                        onFocus={_onFocus}
                        onBlur={_onBlur}
                        keyboardType={keyboardType}
                        placeholder={placeholder}
                        variant='text'
                        selectionColor={theme.colors.cursor}
                        placeholderTextColor={theme.colors.secondaryText}
                        marginHorizontal='s'
                        secureTextEntry={secureTextEntry}
                        style={styles.textInput}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1
    },
    iconContainer: {

    },
    animatedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    inputContainer: {
        flex: 1,
        marginLeft: 10
    },
    textInput: {
        paddingRight: 8
    }
})

export default LargeInput