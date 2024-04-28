import { Section } from '@atomic';
import { VenueType } from '@flux/api/venue/types';
import { SectionHeader } from '@molecules';
import { LargeSelectableItemRadioList } from '@organisms';
import React from 'react';
import { useEditVenuePageContext } from '../EditVenue.context';

const VenueTypeSection = () => {
	const { onChangeVenueType, venueData } = useEditVenuePageContext();

	return (
		<Section margin='m'>
			<SectionHeader text='VenueType' />
			<LargeSelectableItemRadioList
				defaultId={venueData.venue_type}
				data={[
					{
						id: VenueType.club,
						title: 'Club',
						icon: 'club'
					},
					{
						id: VenueType.outdoor,
						title: 'Outdoor',
						icon: 'outdoors'
					},
					{
						id: VenueType.restaurant,
						title: 'Restaurant',
						icon: 'restaurant'
					},
					{
						id: VenueType.area,
						title: 'arena',
						icon: 'arena'
					}
				]}
				onPress={onChangeVenueType}
			/>
		</Section>
	);
};

export default VenueTypeSection;
