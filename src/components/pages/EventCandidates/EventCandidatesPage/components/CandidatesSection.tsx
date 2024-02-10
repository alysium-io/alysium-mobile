import React from 'react'
import { View } from '@atomic'
import { ContentListItemWithStatus } from '@organisms'
import { ContentType } from '@types'
import { global } from '@etc'


const CandidatesSection = () => {

    return (
        <View>
            <ContentListItemWithStatus
                title='Seth Hills'
                subtitle='8:00 pm'
                contentType={ContentType.artist}
                image={global.artistImages['seth hills']}
                onPress={() => console.log('hi')}
                statusText='send offer >'
                statusColor='matt'
                statusBarVariant='filled'
            />
            <ContentListItemWithStatus
                title='Seth Hills'
                subtitle='8:00 pm'
                contentType={ContentType.artist}
                image={global.artistImages['seth hills']}
                onPress={() => console.log('hi')}
                statusText='pending'
                statusColor='t2'
                statusBarVariant='outlined'
            />
            <ContentListItemWithStatus
                title='Seth Hills'
                subtitle='8:00 pm'
                contentType={ContentType.artist}
                image={global.artistImages['seth hills']}
                onPress={() => console.log('hi')}
                statusText='invited'
                statusColor='haze'
                statusBarVariant='outlined'
            />
            <ContentListItemWithStatus
                title='Seth Hills'
                subtitle='8:00 pm'
                contentType={ContentType.artist}
                image={global.artistImages['seth hills']}
                onPress={() => console.log('hi')}
                statusText='confirmed'
                statusColor='matt'
                statusBarVariant='outlined'
            />
        </View>
    )
}

export default CandidatesSection