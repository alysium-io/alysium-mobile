import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { useUser } from '@hooks'
import { Stage } from '@types'
import { AppLoading, AuthPage, AppError } from '@pages'
import { RootAppNavigator } from '@navigation'


const AuthGate = () => {

    const { user, getUser } = useUser()

    useEffect(() => {
        getUser()
            .then(() => SplashScreen.hide())
            .catch(() => SplashScreen.hide())
    }, [user.token])

    if (user.stage === Stage.precheck) {
        return <AppLoading />
    }

    if (user.stage === Stage.loading) {
        return <AppLoading />
    }

    if (user.stage == Stage.loggedOut) {
        return <AuthPage />
    }

    if (user.stage === Stage.loggedIn) {
        return <RootAppNavigator />
    }

    return <AppError />
}

export default AuthGate