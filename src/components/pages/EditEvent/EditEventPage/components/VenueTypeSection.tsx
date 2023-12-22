import React, { useState } from 'react'
import { Section, View } from '@atomic'
import { LargeSelectableItemRadioList } from '@organisms'
import { SectionHeader } from '@molecules'


const VenueTypeSection = () => {

    const [selected, setSelected] = useState<number>(1)

    return (
        <Section margin='m'>
            <SectionHeader text='Venue Type' variant='large' />
            <LargeSelectableItemRadioList
                defaultId={1}
                onPress={(id) => setSelected(id)}
                data={[
                    {
                        id: 1,
                        title: 'Club',
                        icon: 'club'
                    },
                    {
                        id: 2,
                        title: 'Arena',
                        icon: 'arena'
                    },
                    {
                        id: 3,
                        title: 'Restaurant',
                        icon: 'restaurant'
                    },
                    {
                        id: 4,
                        title: 'Outdoor',
                        icon: 'outdoors'
                    }
                ]}
            />
        </Section>
    )
}

export default VenueTypeSection