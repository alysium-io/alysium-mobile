import React from 'react'
import { View, Text, Icon, BgTouchAnimation } from '@atomic'
import { StyleSheet } from 'react-native'
import { ColorTypes, ThemeMode } from '@types'
import { useTheme } from '@hooks'
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

    const { getRawColor, mode, theme } = useTheme()

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

    return (
        <BgTouchAnimation color={colorScheme[mode].backgroundActive} animationType='highlight' onPress={onPress}>
            <View paddingHorizontal='m'>
                <View
                    paddingVertical='l'
                    style={[
                        styles.container,
                        {
                            borderBottomWidth: border ? 0.2 : 0,
                            borderBottomColor: theme.colors.bg2
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
            </View>
        </BgTouchAnimation>
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