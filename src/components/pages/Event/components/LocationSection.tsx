import { Section } from '@atomic';
import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { useLocation } from '@hooks';
import { StaticEventMap } from '@organisms';
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
		<Section>
			<TouchableOpacity onPress={onPressLocation} activeOpacity={0.9}>
				<StaticEventMap events={[eventData]} />
			</TouchableOpacity>
		</Section>
	);
};

export default LocationSection;
