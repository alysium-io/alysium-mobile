import { Section, Text } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { FindAllArtistEventsResponseDto } from '@flux/api/event/dto/artist-event-find-all.dto';
import { Location } from '@molecules';
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
	const markers = eventsData.map((event) => ({
		location: event.event.location,
		label: event.event.name,
		color: 'blue'
	}));

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
			{markers.length > 0 && (
				<Location
					markers={markers}
					containerProps={{
						height: 300,
						margin: 'm',
						style: { borderRadius: 25 }
					}}
				/>
			)}
		</Section>
	);
};

export default EventsSection;
