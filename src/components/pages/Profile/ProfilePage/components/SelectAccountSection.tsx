import React from 'react'
import { Section, View } from '@atomic'
import { SectionHeader } from '@molecules'
import { ContentListItem } from '@organisms'
import { ContentType } from '@types'
import { global } from '@etc'


const SelectAccountSection = () => {

    return (
        <Section marginBottom='xl'>
            <View marginHorizontal='m'>
                <SectionHeader text='Select Account' variant='large' />
            </View>
            <ContentListItem
                title='Seth Hills'
                subtitle='artist'
                onPress={() => console.log('Pressed')}
                contentType={ContentType.artist}
                image={global.artistImages['seth hills']}
                border
            />
            <ContentListItem
                title='Alec Mather'
                subtitle='user'
                onPress={() => console.log('Pressed')}
                contentType={ContentType.user}
                image={global.artistImages['firebeatz']}
                border
            />
        </Section>
    )
}

export default SelectAccountSection