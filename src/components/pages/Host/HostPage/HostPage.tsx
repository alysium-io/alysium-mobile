import React, { useEffect } from 'react'
import { BasePage } from '@organisms'
import { useHostPageContext } from './hooks'
import { MoreOptionsBottomSheet } from '../shared'
import { HostPageProvider } from './contexts'
import { ParallaxPageOutline } from '@templates'
import { global } from '@etc'
import {
    SubHeader,
    NotificationsOptionsBottomSheet,
    LinksBottomSheet,
    ActionButtons
} from './components'


const HostPage = () => {

    const {
        moreSheetApi,
        linksSheetApi,
        notificationsSheetApi,
        data
    } = useHostPageContext()

    useEffect(() => {
        // loadHostData()
    }, [])
    
    return (
        <BasePage>
            {
                data && (
                    <ParallaxPageOutline
                        title={global.sampleData.host.name}
                        image={global.sampleData.host.image}
                    >
                        <SubHeader />
                        <ActionButtons />
                    </ParallaxPageOutline>
                )
            }
            <LinksBottomSheet sheetRef={linksSheetApi.sheetRef} />
            <MoreOptionsBottomSheet sheetRef={moreSheetApi.sheetRef} />
            <NotificationsOptionsBottomSheet sheetRef={notificationsSheetApi.sheetRef} />
        </BasePage>
    )
}

export default () => (
    <HostPageProvider>
        <HostPage />
    </HostPageProvider>
)