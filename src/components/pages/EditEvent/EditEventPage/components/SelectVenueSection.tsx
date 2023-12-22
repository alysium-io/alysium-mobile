import React from 'react'
import { Section, View } from '@atomic'
import { SectionHeader } from '@molecules'
import { ContentListItemToggler } from '@organisms'
import { global } from '@etc'


const SelectVenueSection = () => {

    return (
        <Section marginVertical='m'>
            <View margin='m'>
                <SectionHeader text='Select Venue' variant='large' />
            </View>
            <ContentListItemToggler
                defaultId={1}
                onPress={(id) => console.log(id)}
                subtitleFirst={true}
                items={[
                    {
                        id: 1,
                        image: global.sampleData.venueImages[0],
                        title: 'EDX Nightclub',
                        subtitle: '114 N. Park Rd.'
                    },
                    {
                        id: 2,
                        image: global.sampleData.venueImages[1],
                        title: 'Terry\'s Tavern',
                        subtitle: '10080 W. 8 Mile Rd.'
                    },
                    {
                        id: 3,
                        image: global.sampleData.venueImages[2],
                        title: 'Backyard Bangers',
                        subtitle: '1234 W. 8 Mile Rd.'
                    }
                ]}
            />
        </Section>
    )
}

export default SelectVenueSection