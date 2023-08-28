import React, { useState } from 'react'
import { useSearchQuery } from 'src/redux/api/base/baseApiSlice'
import { ContentType, SearchResponseItem } from '@types'
import { Thinput, ContentListItem, StaticNotchBlur } from '@molecules'
import { BasePage, NotchMargin } from '@atomic'
import { useNavigation } from '@hooks'
import { StyleSheet, ScrollView, Keyboard } from 'react-native'


const Search = () => {

    const { artistPage } = useNavigation()
    const [searchText, setSearchText] = useState<string>('')
    const { data, isLoading, error } = useSearchQuery({ searchText })

    return (
        <BasePage>
            <StaticNotchBlur />
            <NotchMargin />
            <ScrollView
                alwaysBounceVertical={true}
                style={styles.scrollView}
                onScrollBeginDrag={() => { Keyboard.dismiss() }}
                keyboardShouldPersistTaps='always'
            >
                <Thinput
                    icon='search'
                    placeholder='search'
                    onChangeText={setSearchText}
                />
                {
                    data?.map((item: SearchResponseItem, idx: number) => {
                        return (
                            <ContentListItem
                                title={item.spotify_name}
                                subtitle='artist'
                                key={idx}
                                image={item.spotify_image || undefined}
                                onPress={() => artistPage(item.id)}
                                contentType={ContentType.artist}
                            />
                        )
                    })
                }
            </ScrollView>
        </BasePage>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    scrollView: {
        flex: 1,
        overflow: 'visible'
    }
})

export default Search