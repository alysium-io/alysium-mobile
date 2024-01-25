import React from 'react'
import { Section, View } from '@atomic'
import { SectionHeader } from '@molecules'
import { ContentListItemToggler, CreateNewContentListItemToggle } from '@organisms'
import { global } from '@etc'
import { useEditEventPageContext } from '../hooks'
import { useNavigation } from '@hooks'


const SelectVenueSection = () => {

    const { createVenueSheetApi, venuesData } = useEditEventPageContext()
    const { editVenuePage } = useNavigation()

    return (
        <Section marginVertical='m'>
            <View margin='m'>
                <SectionHeader text='Select Venue' variant='large' />
            </View>
            <CreateNewContentListItemToggle
                title='Create New Venue'
                subtitle='address, type, etc.'
                onPress={() => createVenueSheetApi.open()}
                subtitleFirst={true}
                icon='plus'
            />
            <ContentListItemToggler
                defaultId={1}
                onPress={(id) => editVenuePage(id)}
                subtitleFirst={true}
                items={venuesData?.data.map(venue => ({
                    id: venue.id,
                    image: global.sampleData.venueImages[0],
                    title: venue.attributes.name,
                    subtitle: venue.attributes.address || 'Unknown Address'
                })) ?? []}
            />
        </Section>
    )
}

export default SelectVenueSection