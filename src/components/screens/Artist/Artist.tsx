import React from 'react'
import { Text, View } from '@atomic'
import { Page } from '@screens'
import { ArtistPageRouteProp } from '@types'
import { useRoute } from '@react-navigation/native'
import { useArtistQuery } from 'src/redux/api/base/baseApiSlice'
import { StyleSheet } from 'react-native'


const Artist = () => {

    const route = useRoute<ArtistPageRouteProp>()
    const { data, isLoading, error } = useArtistQuery({ artist_id: route.params.item_id })
    console.log(data)

    return (
        <Page>
            <View style={styles.container}>
                <Text>Artist: { route.params.item_id }</Text>
                {
                    data && (
                        <Text>{ data.data.attributes.spotify_name }</Text>
                    )
                }
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    container: {
        
    }
})

export default Artist