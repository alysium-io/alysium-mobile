import React from 'react'
import { Section } from '@atomic'
import { SectionHeader } from '@molecules'
import { LargeSelectableItemRadioList } from '@organisms'


const VenueTypeSection = () => {

    return (
        <Section margin='m'>
            <SectionHeader text='VenueType' />
            <LargeSelectableItemRadioList
                defaultId={1}
                data={[
                    {
                        id: 1,
                        title: 'Club',
                        icon: 'club'
                    },
                    {
                        id: 2,
                        title: 'Outdoor',
                        icon: 'outdoors'
                    },
                    {
                        id: 3,
                        title: 'Restaurant',
                        icon: 'restaurant'
                    },
                    {
                        id: 4,
                        title: 'arena',
                        icon: 'arena'
                    }
                ]}
                onPress={() => { }}
            />
        </Section>
    )
}

export default VenueTypeSection