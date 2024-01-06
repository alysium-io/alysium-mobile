import React from 'react'
import { Section, View } from '@atomic'
import { SectionHeader } from '@molecules'
import { ContentListItem } from '@organisms'
import { ContentType } from '@types'
import { global } from '@etc'
import { useUser } from '@hooks'


const SelectAccountSection = () => {

    const { user } = useUser()

    return (
        <Section marginBottom='xl'>
            <View marginHorizontal='m'>
                <SectionHeader text='Select Account' variant='large' />
            </View>
            <ContentListItem
                title={user.user?.username || 'username'}
                subtitle='user'
                onPress={() => console.log('Pressed')}
                contentType={ContentType.user}
                image={global.artistImages['seth hills']}
                border
            />
            {
                user.user?.hosts.map(host => (
                    <ContentListItem
                        key={host.id}
                        title={host.name}
                        subtitle='host'
                        onPress={() => console.log('Pressed')}
                        contentType={ContentType.host}
                        image={global.sampleData.images.artist}
                        border
                    />
                ))
            }
            {
                user.user?.artists.map(artist => (
                    <ContentListItem
                        key={artist.id}
                        title={artist.name}
                        subtitle='artist'
                        onPress={() => console.log('Pressed')}
                        contentType={ContentType.artist}
                        image={global.sampleData.images.artist}
                        border
                    />
                ))
            }
        </Section>
    )
}

export default SelectAccountSection