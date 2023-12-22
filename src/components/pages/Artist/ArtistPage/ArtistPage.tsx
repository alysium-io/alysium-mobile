import React, { useEffect } from 'react'
import { global } from '@etc'
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

    useEffect(() => {
        // loadArtistData()
    }, [])

    return (
        <BasePage>
            {
                global && (
                    <ParallaxPageOutline
                        title={global.sampleData.artist.name}
                        image={global.sampleData.artist.image}
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