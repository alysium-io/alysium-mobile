import { Section, View } from '@atomic';
import { FindAllVenuesResponseDto } from '@flux/api/venue/dto/venue-find-all.dto';
import { SheetApi, useNavigation } from '@hooks';
import { SectionHeader } from '@molecules';
import {
	ContentListItemToggler,
	CreateNewContentListItemToggle
} from '@organisms';
import { ApiIdentifier } from '@types';
import React from 'react';

interface SelectVenueSectionProps {
	createVenueSheetApi: SheetApi;
	venuesData: FindAllVenuesResponseDto[];
	onChangeVenue: (venue_uid: ApiIdentifier) => void;
	defaultVenueId?: ApiIdentifier;
}

const SelectVenueSection: React.FC<SelectVenueSectionProps> = ({
	createVenueSheetApi,
	venuesData,
	onChangeVenue,
	defaultVenueId
}) => {
	const { editVenuePage } = useNavigation();

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
				defaultId={defaultVenueId}
				subtitleFirst={true}
				onPressToggle={(id) => onChangeVenue(id)}
				items={
					venuesData.map((venue) => ({
						id: venue.venue_uid,
						image: venue.profile_image?.url || '',
						title: venue.name,
						subtitle: venue.street || 'Unknown Address',
						onPress: (venue_uid: ApiIdentifier) => editVenuePage(venue_uid)
					})) ?? []
				}
			/>
		</Section>
	);
};

export default SelectVenueSection;
