import React from 'react'
import { Icon, View } from '@atomic'
import { IconNames } from '@svg'


interface ButtonIconProps {
    icon?: IconNames
    color: string
}

const ButtonIcon : React.FC<ButtonIconProps> = ({
    icon,
    color
}) => {

    if (!icon) {
        return null
    }

    return (
        <View marginLeft='s'>
            <Icon name={icon} color={color}  size='small' />
        </View>
    )
}

export default ButtonIcon