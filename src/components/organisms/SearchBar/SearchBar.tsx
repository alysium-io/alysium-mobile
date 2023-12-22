import React, { useState } from 'react'
import { Icon, View, TextInput, Text } from '@atomic'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { useTextInput, useTheme } from '@hooks'
import { FadeIn, Layout } from 'react-native-reanimated'
import { ThemeMode } from '@types'
import { Colors } from '@etc'


interface SearchBarProps {
    onChangeText: (text: string) => void
    onPressClearText: () => void
    barDidActivate?: () => void
    barDidDeactivate?: () => void
}

const SearchBar : React.FC<SearchBarProps> = ({
    onChangeText,
    onPressClearText,
    barDidActivate,
    barDidDeactivate
}) => {

    const { ref, focus, clear, blur } = useTextInput()
    const { theme, getRawColor, mode } = useTheme()
    const [isActive, setIsActive] = useState<boolean>(false)
    const [showClearButton, setShowClearButton] = useState<boolean>(false)

    const colorScheme = {
        [ThemeMode.dark]: {
            placeholderText: Colors.RGBA2String(Colors.hex2RGBA(getRawColor(theme.colors.ion_light), 0.8)),
            text: theme.colors.ion_light,
            background: 'ion_dark',
            icon: 'ion_light',
            clearBtn: 'ion'
        },
        [ThemeMode.light]: {
            placeholderText: Colors.RGBA2String(Colors.hex2RGBA(getRawColor(theme.colors.ion_dark), 0.7)),
            text: theme.colors.ion_dark,
            background: 'ion_light',
            icon: 'ion_dark',
            clearBtn: 'ion'
        }
    }

    const _onPressActivate = () => {
        setIsActive(true)
        focus()
        barDidActivate && barDidActivate()
    }

    const _onPressDeactivate = () => {
        setIsActive(false)
        blur()
        barDidDeactivate && barDidDeactivate()
    }

    const _onPressClear = () => {
        onPressClearText()
        clear()
        setShowClearButton(false)
    }

    const _onChangeText = (text: string) => {
        onChangeText(text)
        setShowClearButton(text.length > 0)
    }

    return (
        <View style={styles.container}>
            <View
                animated
                layout={Layout.duration(200)}
                style={styles.textContainer}
                backgroundColor={colorScheme[mode].background}
            >
                <TouchableWithoutFeedback onPress={_onPressActivate}>
                    <View padding='s' style={styles.textContainerLeft}>
                        <Icon name='search' size='regular' color={colorScheme[mode].icon} />
                        <View animated paddingLeft='s'>
                            <TextInput
                                ref={ref}
                                variant='paragraph-bold'
                                placeholderTextColor={colorScheme[mode].placeholderText}
                                placeholder='Search Alysium...'
                                onChangeText={_onChangeText}
                                onFocus={_onPressActivate}
                                onBlur={() => setIsActive(false)}
                                style={{ color: colorScheme[mode].text }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                {
                    (showClearButton && isActive) && (
                        <TouchableWithoutFeedback onPress={_onPressClear}>
                            <View animated entering={FadeIn.delay(100).duration(100)} padding='s' style={styles.textContainerRight}>
                                <Icon name='clear' size='regular' color={colorScheme[mode].clearBtn} />
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }
            </View>
            { isActive && (
                <TouchableWithoutFeedback onPress={_onPressDeactivate}>
                    <View
                        animated
                        entering={FadeIn.delay(200).duration(200)}
                        exiting={FadeIn.delay(200).duration(200)}
                        padding='s'
                    >
                        <Text variant='paragraph-small' color='t1'>Cancel</Text>
                    </View>
                </TouchableWithoutFeedback>
            ) }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10
    },
    textContainerLeft: {
        flexDirection: 'row',
        flex: 1
    },
    textContainerRight: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SearchBar