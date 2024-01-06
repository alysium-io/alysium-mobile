import React from 'react'
import { useRoute } from '@react-navigation/native'
import { TagFollowersPageRouteProp } from '@types'
import { View } from '@atomic'
import { TabToggle, useHeader, BasePage } from '@organisms'
import { MoreOptionsBottomSheet } from '../shared'
import { useTagFollowersPageContext } from './hooks'
import { Followers } from './components'


const TagFollowersPage = () => {

    const route = useRoute<TagFollowersPageRouteProp>()
    const { totalHeaderHeight } = useHeader()
    const { moreSheetRef } = useTagFollowersPageContext()

    return (
        <BasePage>
            <View style={{ paddingTop: totalHeaderHeight + 15 }}>
                <TabToggle
                    content={[
                        {
                            title: 'Followers',
                            content: <Followers tagId={route.params.itemId} />
                        }
                    ]}
                />
            </View>
            <MoreOptionsBottomSheet sheetRef={moreSheetRef} />
        </BasePage>
    )
}

export default TagFollowersPage