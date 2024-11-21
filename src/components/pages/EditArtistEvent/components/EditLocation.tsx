import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { useLocation, useNavigation } from '@hooks';
import { Location } from '@molecules';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface EditLocationProps {
	eventData: FindOneArtistEventResponseDto;
}

const EditLocation: React.FC<EditLocationProps> = ({ eventData }) => {
	const locationApi = useLocation(eventData.event.location);
	const { chooseEventLocationPage } = useNavigation();

	const onPressLocation = () => {
		if (eventData?.event.location) {
			locationApi.openMap(eventData.event.name);
		} else {
			chooseEventLocationPage(eventData.event.event_uid);
		}
	};

	if (!locationApi.hasLocation) {
		return null;
	}

	return (
		<TouchableOpacity onPress={onPressLocation} activeOpacity={0.9}>
			<Location
				markers={{
					location: eventData.event.location,
					label: eventData.event.name
				}}
				containerProps={{
					height: 300,
					margin: 'm',
					style: { borderRadius: 25 }
				}}
			/>
		</TouchableOpacity>
	);
};

export default EditLocation;
