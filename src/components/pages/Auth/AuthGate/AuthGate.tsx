import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { useUser } from '@hooks'
import { Stage } from '@types'
import { AuthPage } from '@pages'
import { RootAppNavigator } from '@navigation'


const AuthGate = () => {
    useEffect(() => SplashScreen.hide(), [])
    return <RootAppNavigator />
}

export default AuthGate