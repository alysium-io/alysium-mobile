import React from 'react'
import { useSettings } from '@hooks'
import { AppType } from '@types'
import {
    UserApp,
    HostApp,
    ArtistApp,
    TestApp
} from './apps'


const RootAppNavigator = () => {

    const { app } = useSettings()
    
    const renderApp = () => {
        switch (app) {
            case AppType.user:
                return <UserApp />
            case AppType.host:
                return <HostApp />
            case AppType.artist:
                return <ArtistApp />
            case AppType.test:
                return <TestApp />
            default:
                return <TestApp />
        }
    }

    return renderApp()
}

export default RootAppNavigator