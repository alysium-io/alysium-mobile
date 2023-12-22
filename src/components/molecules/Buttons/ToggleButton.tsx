import React from 'react'
import { Icon, Text, View } from '@atomic'
import { IconNames } from '@svg'
import { interpolateColor, useAnimatedStyle, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import { TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { useTheme } from '@hooks'
import { ThemeMode } from '@types'


const colorScheme = {
    [ThemeMode.dark]: {
        'active': {
            background: 'white',
            border: 'white',
            text: 'black',
            icon: 'black'
        },
        'inactive': {
            background: 'bg2',
            border: 'bg3',
            text: 't2',
            icon: 't2'
        }
    },
    [ThemeMode.light]: {
        'active': {
            background: 'black',
            border: 'white',
            text: 'white',
            icon: 'white'
        },
        'inactive': {
            background: 'bg2',
            border: 'bg3',
            text: 't2',
            icon: 't2'
        }
    }
}

interface ToggleButtonProps {
    value: boolean
    text: string
    inactiveText?: string
    icon?: IconNames
    inactiveIcon?: IconNames
    onPress: () => void
}

const ToggleButton : React.FC<ToggleButtonProps> = ({
    value,
    text,
    inactiveText,
    icon,
    inactiveIcon,
    onPress
}) => {

    const { theme, mode } = useTheme()

    const animatedValue = useSharedValue<number>(value ? 1 : 0)

    const animatedContainerStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(animatedValue.value, [0, 1], [theme.colors[colorScheme[mode].inactive.background], theme.colors[colorScheme[mode].active.background]]),
            borderColor: interpolateColor(animatedValue.value, [0, 1], [theme.colors[colorScheme[mode].inactive.border], theme.colors[colorScheme[mode].active.border]])
        }
    }, [mode])

    const animatedTextStyles = useAnimatedProps(() => {
        return {
            color: interpolateColor(animatedValue.value, [0, 1], [theme.colors[colorScheme[mode].inactive.text], theme.colors[colorScheme[mode].active.text]])
        }
    }, [mode])

    const animatedIconStyles = useAnimatedProps(() => {
        return {
            fill: interpolateColor(animatedValue.value, [0, 1], [theme.colors[colorScheme[mode].inactive.icon], theme.colors[colorScheme[mode].active.icon]])
        }
    }, [mode])

    const _onPress = () => {
        animatedValue.value = withTiming(animatedValue.value === 1 ? 0 : 1, { duration: 200 })
        onPress()
    }

    return (
        <TouchableWithoutFeedback onPress={_onPress}>
            <View
                animated
                style={[
                    styles.container,
                    animatedContainerStyles
                ]}
            >
                <Text
                    animated
                    variant='paragraph-small-bold'
                    style={animatedTextStyles}
                >{(inactiveText && value === false) ? inactiveText : text}</Text>
                { (icon && value === true) && (
                    <View marginLeft='xs'>
                        <Icon
                            animated
                            name={icon}
                            size='small'
                            animatedPathProps={animatedIconStyles}
                        />
                    </View>
                ) }
                { (inactiveIcon && value === false) && (
                    <View marginLeft='xs'>
                        <Icon
                            animated
                            name={inactiveIcon}
                            size='small'
                            animatedPathProps={animatedIconStyles}
                        />
                    </View>
                ) }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 13
    }
})

export default ToggleButton