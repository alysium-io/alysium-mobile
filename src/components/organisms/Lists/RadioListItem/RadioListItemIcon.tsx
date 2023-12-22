import React from 'react'
import { View, Icon } from '@atomic'
import { StyleSheet } from 'react-native'
import { IconNames } from '@svg'


interface RadioListItemIconProps {
    icon: IconNames
}

const RadioListItemIcon : React.FC<RadioListItemIconProps> = ({
    icon
}) => {

    return (
        <Icon
            name={icon}
            size='xlarge'
            color='t2'
        />
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        width: 65
    }
})

export default RadioListItemIcon