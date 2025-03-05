import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { FindAllArtistEventsResponseDto } from '@flux/api/event/dto/artist-event-find-all.dto';
import { useNavigation } from '@hooks';
import { StaticEventMap } from '@organisms';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface EventsMapProps {
	eventsData: FindAllArtistEventsResponseDto;
	artistData: PublicFindOneArtistResponseDto;
}

const EventsMap: React.FC<EventsMapProps> = ({ eventsData, artistData }) => {
	const { artistEventsInteractiveMapPage } = useNavigation();
	const onPressMap = () => {
		artistEventsInteractiveMapPage(artistData.artist_uid);
	};

	return (
		<TouchableOpacity onPress={onPressMap} activeOpacity={0.9}>
			<StaticEventMap events={eventsData} />
		</TouchableOpacity>
	);
};

export default EventsMap;
