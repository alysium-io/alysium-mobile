import React from 'react'
import { useRoute } from '@react-navigation/native'
import { TagFollowersPageRouteProp } from '@types'
import { View } from '@atomic'
import { MoreButton } from '@molecules'
import { TabToggle, useHeader, useNotchBlurHeader, BasePage } from '@organisms'
import { MoreOptionsBottomSheet } from '../shared'
import { useTagFollowersPageContext } from './hooks'
import { Followers } from './components'


const TagFollowersPage = () => {

    const route = useRoute<TagFollowersPageRouteProp>()
    const { totalHeaderHeight } = useHeader()

    const { NotchBlurHeader } = useNotchBlurHeader()

    const { moreSheetRef, openMore } = useTagFollowersPageContext()

    const NotchHeaderRightComponent = () => (
        <MoreButton onPress={openMore} />
    )

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
            <NotchBlurHeader
                title='edm'
                NotchHeaderRightComponent={NotchHeaderRightComponent}
                backgroundColor='bg1'
                titleInterpolationRange={[-100, 0]}
            />
            <MoreOptionsBottomSheet sheetRef={moreSheetRef} />
        </BasePage>
    )
}

export default TagFollowersPage