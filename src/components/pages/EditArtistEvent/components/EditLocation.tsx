import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { useLocation, useNavigation } from '@hooks';
import { Location } from '@molecules';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface EditLocationProps {
	eventData: FindOneArtistEventResponseDto;
}

const EditLocation: React.FC<EditLocationProps> = ({ eventData }) => {
	const { openMap } = useLocation();
	const { chooseEventLocationPage } = useNavigation();

	const onPressLocation = () => {
		if (eventData?.event.location) {
			openMap(
				eventData.event.location.latitude,
				eventData.event.location.longitude,
				eventData.event.name
			);
		} else {
			chooseEventLocationPage(eventData.event.event_uid);
		}
	};

	return (
		<TouchableOpacity onPress={onPressLocation} activeOpacity={0.9}>
			<Location
				location={eventData.event.location}
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
