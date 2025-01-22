import { Section, Text } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { FindAllArtistEventsResponseDto } from '@flux/api/event/dto/artist-event-find-all.dto';
import { useNavigation } from '@hooks';
import { StaticEventMap } from '@organisms';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import EventsSectionListItem from './EventsSectionListItem';

interface EventsSectionProps {
	artistData: PublicFindOneArtistResponseDto;
	eventsData: FindAllArtistEventsResponseDto;
}

const EventsSection: React.FC<EventsSectionProps> = ({
	artistData,
	eventsData
}) => {
	const { artistEventsInteractiveMapPage } = useNavigation();
	const onPressMap = () => {
		artistEventsInteractiveMapPage(artistData.artist_uid);
	};

	if (eventsData.length === 0) {
		return null;
	}

	return (
		<Section>
			<Text variant='section-header-2' marginHorizontal='m' marginBottom='m'>
				Events
			</Text>
			{eventsData?.map((event) => {
				return (
					<EventsSectionListItem
						key={event.event.event_uid}
						event={event}
						artist_uid={artistData.artist_uid}
					/>
				);
			})}
			<TouchableOpacity onPress={onPressMap} activeOpacity={0.9}>
				<StaticEventMap events={eventsData} />
			</TouchableOpacity>
		</Section>
	);
};

export default EventsSection;
