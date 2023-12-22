import React from 'react'
import { View, Section } from '@atomic'
import { SectionHeader } from '@molecules'
import { ContentListItem } from '@organisms'
import { ContentType } from '@types'
import { global } from '@etc'


const Artists = () => {

    return (
        <Section marginTop='l'>
            <View marginHorizontal='m'>
                <SectionHeader text='Artists' />
            </View>
            {
                global.sampleData.listOfArtists.map((artist, index) => (
                    <ContentListItem
                        key={index}
                        rnk={index + 1}
                        title={artist.name}
                        subtitle={artist.location}
                        onPress={() => console.log('pressed')}
                        contentType={ContentType.artist}
                        image={artist.image}
                        size='large'
                        icon='menu'
                        onPressMenu={() => console.log('pressed')}
                    />
                ))
            }
        </Section>
    )
}

export default Artists