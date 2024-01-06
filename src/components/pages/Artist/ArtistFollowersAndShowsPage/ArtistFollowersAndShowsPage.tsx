import React from 'react'
import { useRoute } from '@react-navigation/native'
import { ArtistFollowersAndShowsPageRouteProp } from '@types'
import { View } from '@atomic'
import { TabToggle, useHeader, BasePage } from '@organisms'
import { useArtistFollowersAndShowsPage } from './hooks'
import { MoreOptionsBottomSheet } from '../shared'
import { Followers, Shows } from './components'
import { ArtistFollowersAndShowsPageProvider } from './contexts'


const ArtistFollowersAndShowsPage = () => {

    const route = useRoute<ArtistFollowersAndShowsPageRouteProp>()
    const { totalHeaderHeight } = useHeader()
    const { moreSheetRef, openMore } = useArtistFollowersAndShowsPage()

    return (
        <BasePage>
            <View style={{ paddingTop: totalHeaderHeight + 15 }}>
                <TabToggle
                    defaultTabIndex={route.params.defaultTabIndex}
                    content={[
                        {
                            title: 'Followers',
                            content: <Followers artistId={route.params.itemId} />
                        },
                        {
                            title: 'Shows',
                            content: <Shows artistId={route.params.itemId} />
                        }
                    ]}
                />
            </View>
            <MoreOptionsBottomSheet sheetRef={moreSheetRef} />
        </BasePage>
    )
}

export default () => (
    <ArtistFollowersAndShowsPageProvider>
        <ArtistFollowersAndShowsPage />
    </ArtistFollowersAndShowsPageProvider>
)