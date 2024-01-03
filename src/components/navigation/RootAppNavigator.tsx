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

    if (app === AppType.user) {
        return <UserApp />
    }

    if (app === AppType.host) {
        return <HostApp />
    }

    if (app === AppType.artist) {
        return <ArtistApp />
    }

    if (app === AppType.test) {
        return <TestApp />
    }
}

export default RootAppNavigator