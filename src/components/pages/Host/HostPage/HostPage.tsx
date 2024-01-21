import React from 'react'
import { BasePage } from '@organisms'
import { useHostPageContext } from './hooks'
import { MoreOptionsBottomSheet } from '../shared'
import { HostPageProvider } from './contexts'
import { ParallaxPageOutline } from '@templates'
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
    
    return (
        <BasePage>
            {
                data && (
                    <ParallaxPageOutline
                        title={data.data.attributes.name}
                        image={data.data.attributes.image || ''}
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