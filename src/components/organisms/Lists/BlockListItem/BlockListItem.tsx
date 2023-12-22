import React from 'react'
import { View, Icon, Text } from '@atomic'
import { IconNames } from '@svg'
import { ColorTypes, ThemeMode } from '@types'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { useTheme } from '@hooks'


interface BlockListItemProps {
    icon?: IconNames
    title: string
    subtitle?: string
    color: ColorTypes
    onPress?: () => void
}

const BlockListItem : React.FC<BlockListItemProps> = ({
    icon,
    title,
    subtitle,
    color,
    onPress = () => console.log('BlockListItem pressed')
}) => {

    const { mode } = useTheme()

    const colorScheme = {
        [ThemeMode.dark]: {
            background: color + '_dark',
            icon: color,
            title: 't1',
            subtitle: color + '_light'
        },
        [ThemeMode.light]: {
            background: color + '_light',
            icon: color,
            title: 't1',
            subtitle: color + '_dark'
        }
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container} backgroundColor={colorScheme[mode].background} paddingHorizontal='m'>
                { icon && (
                    <Icon
                        name={icon}
                        color={colorScheme[mode].icon}
                        size='large'
                    />
                ) }
                <View marginLeft='m' style={styles.textContainer}>
                    <Text variant='paragraph' color={colorScheme[mode].title}>{title}</Text>
                    { subtitle && (
                        <Text variant='paragraph-small' color={colorScheme[mode].subtitle} marginTop='xs'>{subtitle}</Text>
                    ) }
                </View>
                <Icon
                    name='arrow-right'
                    color={colorScheme[mode].subtitle}
                    size='small'
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 65,
        borderRadius: 10
    },
    textContainer: {
        flex: 1
    }
})

export default BlockListItem