import { Section, Text } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { FindAllArtistEventsResponseDto } from '@flux/api/event/dto/artist-event-find-all.dto';
import { useDate, useImage, useNavigation } from '@hooks';
import { ContentListItem, Location } from '@molecules';
import dayjs from 'dayjs';
import React from 'react';

interface EventsSectionProps {
	artistData: PublicFindOneArtistResponseDto;
	eventsData: FindAllArtistEventsResponseDto;
}

const EventsSection: React.FC<EventsSectionProps> = ({
	artistData,
	eventsData
}) => {
	const { eventPage, artistEventsPage } = useNavigation();
	const { semantic } = useDate();
	const { urlForKey } = useImage();

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
				const semanticDateString = semantic(event.event.start_time);
				const defaultDateString =
					event.event.start_time !== null
						? dayjs(event.event.start_time).format('MMM D, YYYY')
						: event.event.status;
				const bottomSubtext =
					semanticDateString !== '' ? semanticDateString : defaultDateString;
				return (
					<ContentListItem
						key={event.event.event_uid}
						onPress={() =>
							eventPage(event.event.event_uid, {
								from: 'ArtistPage',
								from_uid: artistData.artist_uid,
								to: 'EventPage',
								to_uid: event.event.event_uid,
								using: 'ARTIST_PAGE_EVENT_CONTENT_LIST_ITEM'
							})
						}
						titleTextProps={{
							title: event.event.name,
							bottomSubtext
						}}
						profileImageProps={{
							image: urlForKey(event.event.profile_image?.small.key),
							borderRadius: 'none',
							defaultImageProps: {
								icon: 'event'
							}
						}}
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
