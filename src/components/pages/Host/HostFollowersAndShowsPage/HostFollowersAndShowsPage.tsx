import React from 'react'
import { useRoute } from '@react-navigation/native'
import { HostFollowersAndShowsPageRouteProp } from '@types'
import { View } from '@atomic'
import { BasePage, TabToggle, useHeader } from '@organisms'
import { useHostFollowersAndShowsPage } from './hooks'
import { MoreOptionsBottomSheet } from '../shared'
import { Followers, Shows } from './components'
import { HostFollowersAndShowsPageProvider } from './contexts'


const HostFollowersAndShowsPage = () => {

    const route = useRoute<HostFollowersAndShowsPageRouteProp>()
    const { totalHeaderHeight } = useHeader()

    const { moreSheetRef, openMore } = useHostFollowersAndShowsPage()

    return (
        <BasePage>
            <View style={{ paddingTop: totalHeaderHeight + 15 }}>
                <TabToggle
                    defaultTabIndex={route.params.defaultTabIndex}
                    content={[
                        {
                            title: 'Followers',
                            content: <Followers hostId={route.params.itemId} />
                        },
                        {
                            title: 'Shows',
                            content: <Shows hostId={route.params.itemId} />
                        }
                    ]}
                />
            </View>
            <MoreOptionsBottomSheet sheetRef={moreSheetRef} />
        </BasePage>
    )
}

export default () => (
    <HostFollowersAndShowsPageProvider>
        <HostFollowersAndShowsPage />
    </HostFollowersAndShowsPageProvider>
)