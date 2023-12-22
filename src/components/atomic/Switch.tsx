import React from 'react'
import { useTheme } from '@hooks'
import { ThemeMode } from '@types'
import { Switch as RNSwitch } from 'react-native'


interface SwitchProps {
    onPress?: (newValue: boolean) => void
    value?: boolean
}

const Switch : React.FC<SwitchProps> = ({
    onPress,
    value
}) => {

    const { mode, theme } = useTheme()

    return (
        <RNSwitch
            trackColor={{ true: '#81b0ff' }}
            thumbColor={mode === ThemeMode.dark ? theme.colors.t1 : theme.colors.t2}
            ios_backgroundColor={mode === ThemeMode.dark ? theme.colors.bg3 : theme.colors.bg2}
            onValueChange={() => onPress && onPress(!value)}
            value={value}
        />
    )
}

export default Switch