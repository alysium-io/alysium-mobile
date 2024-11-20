import { View } from '@atomic';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { useLocation, useNavigation } from '@hooks';
import { MenuListItem } from '@molecules';
import React from 'react';

interface EditEventLocationProps {
	eventData: FindOneArtistEventResponseDto;
}

const EditEventLocation: React.FC<EditEventLocationProps> = ({ eventData }) => {
	const { chooseEventLocationPage } = useNavigation();
	const locationApi = useLocation(eventData.event.location);

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
				titleTextProps={{
					title: locationApi.hasLocation ? title : 'Select a Location',
					titleVariant: 'paragraph-medium',
					bottomSubtext: subtitle,
					bottomSubtextVariant: 'paragraph-small',
					bottomSubtextColor: 'text.q'
				}}
			/>
		</View>
	);
};

export default EditEventLocation;
