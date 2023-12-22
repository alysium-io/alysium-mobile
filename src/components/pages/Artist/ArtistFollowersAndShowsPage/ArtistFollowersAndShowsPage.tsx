import React from 'react'
import { useRoute } from '@react-navigation/native'
import { ArtistFollowersAndShowsPageRouteProp } from '@types'
import { View } from '@atomic'
import { MoreButton } from '@molecules'
import { TabToggle, useHeader, useNotchBlurHeader, BasePage } from '@organisms'
import { useArtistFollowersAndShowsPage } from './hooks'
import { MoreOptionsBottomSheet } from '../shared'
import { Followers, Shows } from './components'
import { ArtistFollowersAndShowsPageProvider } from './contexts'


const ArtistFollowersAndShowsPage = () => {

    const route = useRoute<ArtistFollowersAndShowsPageRouteProp>()
    const { totalHeaderHeight } = useHeader()
    const { moreSheetRef, openMore } = useArtistFollowersAndShowsPage()
    const { NotchBlurHeader } = useNotchBlurHeader()

    const NotchHeaderRightComponent = () => (
        <MoreButton onPress={openMore} />
    )

    return (
        <BasePage>
            <NotchBlurHeader
                title='Mesto'
                NotchHeaderRightComponent={NotchHeaderRightComponent}
                backgroundColor='bg1'
                titleInterpolationRange={[-100, 0]}
                border={false}
            />
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