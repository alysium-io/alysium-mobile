import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'
import { useUser } from '@hooks'
import { Stage } from '@types'
import {
    Loading,
    Error
} from '@screens'


const Auth = () => {

    const { user, getUser } = useUser()

    useEffect(() => {
        getUser().then(() => SplashScreen.hide())
    }, [])

    const getPage = () => {
        switch (user.stage) {
            case Stage.precheck || Stage.loading:
                return <Loading />
            case Stage.error:
                return <Error />
            case Stage.loggedIn:
                return <LoggedIn />
            case Stage.loggedOut:
                return <LoggedOut />
        }
    }

    return getPage()
    
}

export default Auth