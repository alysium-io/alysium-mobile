import { Section } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { artistEventApiSlice } from '@flux/api/event';
import { useImage, useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import React from 'react';

interface EventsSectionProps {
	artistData: PublicFindOneArtistResponseDto;
}

const EventsSection: React.FC<EventsSectionProps> = ({ artistData }) => {
	const { artistEventPage } = useNavigation();
	const { urlForKey } = useImage();
	const { data } = artistEventApiSlice.usePrivateFindAllArtistEventsQuery({
		params: {
			artist_uid: artistData.artist_uid
		}
	});

	return (
		<Section>
			{data?.map((event) => (
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
						bottomSubtext: event.event.status
					}}
					profileImageProps={{
						image: urlForKey(event.event.profile_image?.small.key),
						borderRadius: 'none',
						defaultImageProps: {
							icon: 'event'
						}
					}}
				/>
			))}
		</Section>
	);
};

export default EventsSection;
