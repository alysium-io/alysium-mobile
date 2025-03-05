import { Section, Text } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { FindAllArtistEventsResponseDto } from '@flux/api/event/dto/artist-event-find-all.dto';
import { useSplitEventsByComplexStatus } from '@hooks';
import React from 'react';
import EventsSectionListItem from './EventsSectionListItem';

interface EventsSectionProps {
	artistData: PublicFindOneArtistResponseDto;
	eventsData: FindAllArtistEventsResponseDto;
}

const EventsSection: React.FC<EventsSectionProps> = ({
	artistData,
	eventsData
}) => {
	const { coming_up } = useSplitEventsByComplexStatus(eventsData);

	if (coming_up.length === 0) {
		return null;
	}

	return (
		<Section>
			<Text variant='section-header-2' marginHorizontal='m' marginBottom='s'>
				Events
			</Text>
			{coming_up.map((event) => {
				return (
					<EventsSectionListItem
						key={event.event.event_uid}
						event={event}
						artist_uid={artistData.artist_uid}
					/>
				);
			})}
		</Section>
	);
};

export default EventsSection;
