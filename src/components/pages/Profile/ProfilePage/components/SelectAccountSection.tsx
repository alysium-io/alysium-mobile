import React from 'react'
import { Section, View } from '@atomic'
import { SectionHeader } from '@molecules'
import { ContentListItem } from '@organisms'
import { ContentType, Persona } from '@types'
import { global } from '@etc'
import { usePersona, useUser } from '@hooks'


const SelectAccountSection = () => {

    const { user } = useUser()
    const { setPersona } = usePersona()

    return (
        <Section marginBottom='xl'>
            <View marginHorizontal='m'>
                <SectionHeader text='Select Account' variant='large' />
            </View>
            <ContentListItem
                title={user.user?.username || 'username'}
                subtitle='user'
                onPress={() => user.user && setPersona(user.user?.id, Persona.user)}
                contentType={ContentType.user}
                image={global.artistImages['seth hills']}
                border
            />
            {
                user.user?.hosts?.map(host => (
                    <ContentListItem
                        key={host.id}
                        title={host.name || 'Host Name'}
                        subtitle='host'
                        onPress={() => setPersona(host.id, Persona.host)}
                        contentType={ContentType.host}
                        image={global.sampleData.images.artist}
                        border
                    />
                ))
            }
            {
                user.user?.artists?.map(artist => (
                    <ContentListItem
                        key={artist.id}
                        title={artist.name || 'Artist Name'}
                        subtitle='artist'
                        onPress={() => setPersona(artist.id, Persona.artist)}
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