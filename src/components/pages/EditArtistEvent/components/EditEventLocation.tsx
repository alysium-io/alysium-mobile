import { View } from '@atomic';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { useLocation, useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import React from 'react';

interface EditEventLocationProps {
	eventData: FindOneArtistEventResponseDto;
}

const EditEventLocation: React.FC<EditEventLocationProps> = ({ eventData }) => {
	const { chooseEventLocationPage } = useNavigation();
	const { getAddressComponent } = useLocation();

	const country = getAddressComponent(
		eventData.event.location?.address_components ?? [],
		'administrative_area_level_1'
	);

	return (
		<View>
			<ContentListItem
				onPress={() => chooseEventLocationPage(eventData.event.event_uid)}
				titleTextProps={{
					title:
						eventData.event.location?.formatted_address ?? 'Select a Location',
					bottomSubtext: country?.long_name ?? ''
				}}
				profileImageProps={{
					borderRadius: 'none',
					defaultImageProps: {
						icon: 'location'
					}
				}}
			/>
		</View>
	);
};

export default EditEventLocation;
