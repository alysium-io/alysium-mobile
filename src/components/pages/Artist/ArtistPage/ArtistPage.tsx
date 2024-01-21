import React from 'react'
import { useArtistPageContext } from './hooks'
import { MoreOptionsBottomSheet } from '../shared'
import { ArtistPageProvider } from './contexts'
import { ParallaxPageOutline } from '@templates'
import { BasePage } from '@organisms'
import {
    NotificationsOptionsBottomSheet,
    LinksBottomSheet,
    SubHeader,
    ActionButtons
} from './components'


const ArtistPage = () => {

    const {
        moreSheetApi,
        notificationsSheetApi,
        linksSheetApi,
        data
    } = useArtistPageContext()

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
    <ArtistPageProvider>
        <ArtistPage />
    </ArtistPageProvider>
)