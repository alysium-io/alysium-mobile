import React from 'react'
import { View, Text, Icon } from '@atomic'
import { StyleSheet } from 'react-native'
import { ColorTypes, ThemeMode } from '@types'
import { useBgTouchAnimation, useTheme } from '@hooks'
import { Colors } from '@etc'


interface MenuListItemProps {
    title: string
    subtitle?: string
    onPress?: () => void
    color?: ColorTypes
    secondaryText?: string
    border?: boolean
    titleProps?: React.ComponentProps<typeof Text>
}

const MenuListItem : React.FC<MenuListItemProps> = ({
    title,
    subtitle,
    color = 'default',
    onPress,
    secondaryText,
    titleProps,
    border = true
}) => {

    const { getRawColor, mode } = useTheme()

    const colorScheme = {
        [ThemeMode.dark]: {
            backgroundActive: Colors.RGBA2String(Colors.hex2RGBA(getRawColor(color), 0.1)),
            border: getRawColor(color + '_dark'),
            text: color + '_light'
        },
        [ThemeMode.light]: {
            backgroundActive: Colors.RGBA2String(Colors.hex2RGBA(getRawColor(color), 0.1)),
            border: getRawColor(color + '_light'),
            text: color + '_dark'
        }
    }

    const { Touchable } = useBgTouchAnimation('transparent', colorScheme[mode].backgroundActive)

    return (
        <Touchable onPress={onPress} paddingHorizontal='m'>
            <View
                paddingVertical='l'
                style={[
                    styles.container,
                    {
                        borderBottomWidth: border ? 0.5 : 0,
                        borderBottomColor: colorScheme[mode].border
                    }
                ]}
            >
                <View style={styles.textContainer}>
                    <Text variant='paragraph-medium' numberOfLines={0} {...titleProps}>{title}</Text>
                    { subtitle && <Text variant='paragraph-small' numberOfLines={0} color={colorScheme[mode].text} marginTop='xs'>{subtitle}</Text> }
                </View>
                { secondaryText && (
                    <View marginHorizontal='s'>
                        <Text variant='paragraph-small' color={colorScheme[mode].text}>{secondaryText}</Text>
                    </View>
                ) }
                <Icon
                    name='arrow-right'
                    size='small'
                    color={color}
                />
            </View>
        </Touchable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1
    }
})

export default MenuListItem