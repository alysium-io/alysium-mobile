import React from 'react'
import { global } from '@etc'
import { Section, View } from '@atomic'
import { SectionHeader } from '@molecules'
import { ContentListItemToggler } from '@organisms'


const SelectEventSection = () => {

    return (
        <Section>
            <View margin='m'>
                <SectionHeader text='Select Event' variant='large' />
            </View>
            <ContentListItemToggler
                defaultId={1}
                onPress={(id) => console.log(id)}
                subtitleFirst={true}
                items={[
                    {
                        id: 1,
                        image: global.sampleData.venueImages[0],
                        title: 'EDX Tuesdays',
                        subtitle: 'Tuesday Jan. 23rd'
                    },
                    {
                        id: 2,
                        image: global.sampleData.venueImages[1],
                        title: 'Sub Sessions',
                        subtitle: 'Thursday October 12th'
                    },
                    {
                        id: 3,
                        image: global.sampleData.venueImages[2],
                        title: 'EDX Thursdays',
                        subtitle: 'Friday November 3rd'
                    }
                ]}
            />
        </Section>
    )
}

export default SelectEventSection