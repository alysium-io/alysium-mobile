import { Section, View } from '@atomic';
import { useNavigation } from '@hooks';
import { SectionHeader } from '@molecules';
import {
	ContentListItemToggler,
	CreateNewContentListItemToggle
} from '@organisms';
import { ApiIdentifier } from '@types';
import React from 'react';
import { useEditEventPageContext } from '../EditEvent.context';

const SelectVenueSection = () => {
	const { createVenueSheetApi, venuesData, onChangeVenue } =
		useEditEventPageContext();
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
				defaultId={1}
				subtitleFirst={true}
				onPressToggle={(id) => onChangeVenue(id)}
				items={
					venuesData?.map((venue) => ({
						id: venue.venue_id,
						image: venue.profile_image?.url || '',
						title: venue.name,
						subtitle: venue.street || 'Unknown Address',
						onPress: (venue_id: ApiIdentifier) => editVenuePage(venue_id)
					})) ?? []
				}
			/>
		</Section>
	);
};

export default SelectVenueSection;
