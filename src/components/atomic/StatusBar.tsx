import React from 'react'
import { useSettings } from '@hooks'
import { StatusBar as RNStatusBar } from 'react-native'


const StatusBar = () => {
    const { theme } = useSettings()
    return <RNStatusBar barStyle={theme.colors.statusBar} />
}

export default StatusBar