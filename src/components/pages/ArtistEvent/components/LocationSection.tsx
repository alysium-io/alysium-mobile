import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { useLocation } from '@hooks';
import { Location } from '@molecules';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface LocationSectionProps {
	eventData: FindOneEventResponseDto;
}

const LocationSection: React.FC<LocationSectionProps> = ({ eventData }) => {
	const locationApi = useLocation(eventData.event.location);
	const onPressLocation = () => locationApi.openMap(eventData.event.name);

	if (eventData.event.location === null) {
		return null;
	}

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

export default LocationSection;
