import { Section, Text } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { artistEventApiSlice } from '@flux/api/event';
import { useDate, useImage, useNavigation } from '@hooks';
import { ContentListItem, SeeAllBottomButton } from '@molecules';
import day from 'dayjs';
import React from 'react';

interface EventsSectionProps {
	artistData: PublicFindOneArtistResponseDto;
}

const EventsSection: React.FC<EventsSectionProps> = ({ artistData }) => {
	const { artistEventPage, artistEventsPage } = useNavigation();
	const { semantic } = useDate();
	const { urlForKey } = useImage();
	const { data } = artistEventApiSlice.usePublicFindAllArtistEventsQuery({
		params: {
			artist_uid: artistData.artist_uid
		},
		query: {
			page: 1,
			limit: 5
		}
	});

	return (
		<Section>
			<Text variant='section-header-2' marginHorizontal='m' marginBottom='m'>
				Events
			</Text>
			{data?.map((event) => {
				const semanticDateString = semantic(event.event.start_time);
				const defaultDateString =
					event.event.start_time !== null
						? day(event.event.start_time).format('MMM D, YYYY')
						: event.event.status;
				const bottomSubtext =
					semanticDateString !== '' ? semanticDateString : defaultDateString;
				return (
					<ContentListItem
						key={event.event.event_uid}
						onPress={() =>
							artistEventPage(event.event.event_uid, {
								from: 'ArtistPage',
								from_uid: artistData.artist_uid,
								to: 'ArtistEventPage',
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
			<SeeAllBottomButton
				onPress={() =>
					artistEventsPage(artistData.artist_uid, {
						from: 'ArtistPage',
						from_uid: artistData.artist_uid,
						to: 'ArtistEventsPage',
						to_uid: artistData.artist_uid,
						using: 'ARTIST_PAGE_EVENTS_SECTION_SEE_ALL'
					})
				}
			/>
		</Section>
	);
};

export default EventsSection;
