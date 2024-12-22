import { View } from '@atomic';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { useLocation, useNavigation } from '@hooks';
import { MenuListItem } from '@molecules';
import React from 'react';

interface LocationSectionProps {
	eventData: FindOneArtistEventResponseDto;
}

const LocationSection: React.FC<LocationSectionProps> = ({ eventData }) => {
	const locationApi = useLocation(eventData.event.location);
	const { chooseEventLocationPage } = useNavigation();

	const title = locationApi.build([
		{ type: 'street_number' },
		{ type: 'route' }
	]);

	const subtitle = locationApi.build([
		{ type: 'locality' },
		{ type: 'administrative_area_level_1', nameLength: 'short_name' },
		{ type: 'postal_code' }
	]);

	return (
		<View>
			<MenuListItem
				onPress={() => chooseEventLocationPage(eventData.event.event_uid)}
				prefixIconProps={{
					name: 'location',
					size: 'l'
				}}
				titleTextProps={{
					title: locationApi.hasLocation ? title : 'Where?',
					titleVariant: 'paragraph-medium',
					bottomSubtext: locationApi.hasLocation
						? subtitle
						: 'Select a location',
					bottomSubtextVariant: 'paragraph-small',
					bottomSubtextColor: 'text.q'
				}}
			/>
		</View>
	);
};

export default LocationSection;
