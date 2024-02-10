import React from 'react'
import { Section, View } from '@atomic'
import { SectionHeader } from '@molecules'
import { ContentListItemToggler, CreateNewContentListItemToggle } from '@organisms'
import { global } from '@etc'
import { useEditEventPageContext } from '../hooks'
import { useNavigation } from '@hooks'


const SelectVenueSection = () => {

    const { createVenueSheetApi, venuesData, onChangeVenue, eventData } = useEditEventPageContext()
    const { editVenuePage } = useNavigation()

    return (
        <Section marginVertical='m'>
            <View margin='m'>
                <SectionHeader text='Select Venue' titleVariant='large' />
            </View>
            <CreateNewContentListItemToggle
                title='Create New Venue'
                subtitle='address, type, etc.'
                onPress={() => createVenueSheetApi.open()}
                subtitleFirst={true}
            />
            <ContentListItemToggler
                defaultId={eventData?.data.attributes.venue?.data?.id ?? null}
                subtitleFirst={true}
                onPressToggle={(id) => onChangeVenue(id)}
                items={venuesData?.data.map(venue => ({
                    id: venue.id,
                    image: global.sampleData.venueImages[0],
                    title: venue.attributes.name,
                    subtitle: venue.attributes.address || 'Unknown Address',
                    onPress: (id: number) => editVenuePage(id)
                })) ?? []}
            />
        </Section>
    )
}

export default SelectVenueSection