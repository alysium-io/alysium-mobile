import { Section } from '@atomic';
import { FindOneVenueResponseDto } from '@flux/api/venue/dto/venue-find-one.dto';
import { VenueType } from '@flux/api/venue/types';
import { SectionHeader } from '@molecules';
import { LargeSelectableItemRadioList } from '@organisms';
import React from 'react';

interface VenueTypeSectionProps {
	onChangeVenueType: (venueType: VenueType) => void;
	venueData: FindOneVenueResponseDto;
}

const VenueTypeSection: React.FC<VenueTypeSectionProps> = ({
	onChangeVenueType,
	venueData
}) => {
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
