import React, { useState } from 'react'
import { useSearchQuery } from 'src/redux/api/base/baseApiSlice'
import { ContentType, SearchResponseItem, SearchScreenNavigationProp } from '@types'
import { Thinput, ContentListItem } from '@molecules'
import { Page } from '@screens'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, ScrollView, Keyboard } from 'react-native'


const Search = () => {

    const navigation = useNavigation<SearchScreenNavigationProp>()
    const [searchText, setSearchText] = useState<string>('')
    const { data, isLoading, error } = useSearchQuery({ searchText })
    console.log({ data })
    return (
        <Page>
            <ScrollView
                alwaysBounceVertical={true}
                style={styles.scrollView}
                onScrollBeginDrag={() => { Keyboard.dismiss() }}
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
                                onPress={() => navigation.navigate('ArtistPage', { item_id: item.id })}
                                contentType={ContentType.artist}
                            />
                        )
                    })
                }
                {
                    data?.map((item: SearchResponseItem, idx: number) => {
                        return (
                            <ContentListItem
                                title={item.spotify_name}
                                subtitle='artist'
                                key={idx}
                                image={item.spotify_image || undefined}
                                onPress={() => navigation.navigate('ArtistPage', { item_id: item.id })}
                                contentType={ContentType.artist}
                            />
                        )
                    })
                }
                {
                    data?.map((item: SearchResponseItem, idx: number) => {
                        return (
                            <ContentListItem
                                title={item.spotify_name}
                                subtitle='artist'
                                key={idx}
                                image={item.spotify_image || undefined}
                                onPress={() => navigation.navigate('ArtistPage', { item_id: item.id })}
                                contentType={ContentType.artist}
                            />
                        )
                    })
                }
            </ScrollView>
        </Page>
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