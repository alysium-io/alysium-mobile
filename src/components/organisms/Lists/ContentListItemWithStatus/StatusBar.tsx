import React from 'react'
import { Text, View } from '@atomic'
import { useTheme } from '@hooks'


interface StatusBarProps {
    statusText: string
    statusColor: string
    statusBarVariant: 'filled' | 'outlined'
}

const StatusBar : React.FC<StatusBarProps> = ({
    statusText,
    statusColor,
    statusBarVariant
}) => {

    const { getRawColor } = useTheme()

    const scheme = {
        filled: {
            bg: statusColor,
            text: 'bg1',
            borderWidth: 0,
            textVariant: 'paragraph-small-bold'
        },
        outlined: {
            bg: 'transparent',
            text: statusColor,
            borderWidth: 0.7,
            textVariant: 'paragraph-small'
        }
    }

    return (
        <View
            backgroundColor={scheme[statusBarVariant].bg}
            style={{
                borderColor: getRawColor(statusColor),
                borderRadius: 5,
                borderWidth: scheme[statusBarVariant].borderWidth,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Text
                variant={scheme[statusBarVariant].textVariant}
                color={scheme[statusBarVariant].text}
                margin='s'
            >{ statusText }</Text>
        </View>
    )
}

export default StatusBar