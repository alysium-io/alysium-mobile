import React from 'react'
import { View, Text, Icon } from '@atomic'
import { IconSize, RestyleTextColor } from '@types'
import { IconNames } from '@svg'


const settings = {
    'regular': {
        textVariant: 'section-header-1',
        iconName: 'info-one' as IconNames,
        iconSize: 'regular' as keyof IconSize,
        iconColor: 't2'
    },
    'large': {
        textVariant: 'section-header-2',
        iconName: 'info-two' as IconNames,
        iconSize: 'large' as keyof IconSize,
        iconColor: 't3'
    }
}

interface SectionHeaderProps {
    text: string
    color?: RestyleTextColor
    variant?: keyof typeof settings
    icon?: IconNames
}

const SectionHeader : React.FC<SectionHeaderProps> = ({
    text,
    color,
    variant = 'regular',
    icon
}) => {

    return (
        <View marginBottom='s' flexDirection='row' justifyContent='space-between' alignItems='center'>
            <View flexDirection='row' alignItems='center'>
                <Text
                    variant={settings[variant].textVariant}
                    color={color ? color : 't1'}
                >{text}</Text>
                {
                    icon && (
                        <View marginLeft='s'>
                            <Icon
                                name={icon}
                                size={settings[variant].iconSize}
                                color='ion'
                            />
                        </View>
                    )
                }
            </View>
            <Icon
                name={settings[variant].iconName}
                color={settings[variant].iconColor}
                size={settings[variant].iconSize}
            />
        </View>
    )
}

export default SectionHeader