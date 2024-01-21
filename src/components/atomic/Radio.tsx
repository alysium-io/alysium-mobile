import React, { useMemo } from 'react'
import { Icon, View } from '@atomic'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { useAnimatedState, useTheme } from '@hooks'
import { FeatureColors, ThemeMode } from '@types'
import { interpolateColor, useAnimatedStyle } from 'react-native-reanimated'


interface RadioProps {
    checked: boolean
    onPress: () => void
    colorVariant?: 'default' | keyof FeatureColors
}

const Radio : React.FC<RadioProps> = ({
    checked,
    onPress,
    colorVariant = 'default'
}) => {

    const { mode, getRawColor, theme } = useTheme()
    const {
        state: animatedOpacityState,
        toggle: toggleAnimatedOpacityState
    } = useAnimatedState(checked, { duration: 100 })

    const colorScheme = useMemo(() => {
        if (mode === ThemeMode.dark) {
            return { color: colorVariant === 'default' ? 'white' : colorVariant }
        } else {
            return { color: colorVariant === 'default' ? 'black' : colorVariant }
        }
    }, [mode, colorVariant])

    const animatedStyle = useAnimatedStyle(() => {
        return { opacity: animatedOpacityState.value }
    }, [])

    const animatedBgStyle = useAnimatedStyle(() => {
        return { backgroundColor: interpolateColor(animatedOpacityState.value, [0, 1], ['transparent', theme.colors[colorScheme.color]]) }
    }, [])

    const _onPress = () => {
        onPress()
        toggleAnimatedOpacityState()
    }

    return (
        <TouchableWithoutFeedback onPress={_onPress}>
            <View flexDirection='row'>
                <View animated style={[
                    styles.container,
                    animatedBgStyle,
                    { borderColor: getRawColor(colorScheme.color) }
                ]}>
                    <View
                        animated
                        style={[
                            animatedStyle,
                            { height: 14, width: 14 }
                        ]}
                    >
                        <Icon
                            name='checkmark'
                            size='expanded'
                            color='white'
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        padding: 4
    }
})

export default Radio