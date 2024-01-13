import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { AuthStage } from '@types'
import AuthScreens from './screens'
import { useAuth } from '@hooks'


interface AuthGateProps {
    children?: React.ReactNode
}

const AuthGate : React.FC<AuthGateProps> = ({ children }) => {

    const { auth, getAuthUser } = useAuth()

    useEffect(() => {
        getAuthUser()
            .then(() => SplashScreen.hide())
            .catch(() => SplashScreen.hide())
    }, [auth.token])

    if (auth.stage === AuthStage.loggedIn) {
        return children
    }

    const AuthComponent = AuthScreens[auth.stage]
    return <AuthComponent />
}

export default AuthGate