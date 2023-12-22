import React from 'react'
import { View } from '@atomic'
import { Lineup } from '@organisms'
import { global } from '@etc'


const ArtistLineup = () => {

    return (
        <View>
            <Lineup lineup={global.sampleData.event.lineup} />
        </View>
    )
}

export default ArtistLineup