import { LiveIndicator, Section, Text, View } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { FindAllArtistEventsResponseDto } from '@flux/api/event/dto/artist-event-find-all.dto';
import { useSplitEventsByComplexStatus } from '@hooks';
import React from 'react';
import EventsSectionListItem from './EventsSectionListItem';

interface LiveEventsSectionProps {
	artistData: PublicFindOneArtistResponseDto;
	eventsData: FindAllArtistEventsResponseDto;
}

const LiveEventsSection: React.FC<LiveEventsSectionProps> = ({
	artistData,
	eventsData
}) => {
	const { live } = useSplitEventsByComplexStatus(eventsData);

	if (live.length === 0) {
		return null;
	}

	return (
		<Section>
			<View
				flexDirection='row'
				alignItems='center'
				marginHorizontal='m'
				marginBottom='s'
			>
				<LiveIndicator active />
				<Text variant='paragraph-medium' color='danger' marginLeft='s'>
					Live
				</Text>
			</View>
			{live.map((event) => {
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

export default LiveEventsSection;
