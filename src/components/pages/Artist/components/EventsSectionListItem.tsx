import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useImage, useNavigation } from '@hooks';
import { EventContentListItem } from '@molecules';
import { NanoId } from '@types';
import dayjs from 'dayjs';
import React from 'react';

interface EventsSectionListItemProps {
	event: EventLink;
	artist_uid: NanoId;
}

const EventsSectionListItem: React.FC<EventsSectionListItemProps> = ({
	event,
	artist_uid
}) => {
	const { urlForKey } = useImage();
	const { eventPage } = useNavigation();
	const startTime = dayjs(event.event.start_time);
	const bottomSubtext =
		startTime && startTime.isValid() ? startTime.fromNow() : undefined;
	return (
		<EventContentListItem
			key={event.event.event_uid}
			onPress={() =>
				eventPage(event.event.event_uid, {
					from: 'ArtistPage',
					from_uid: artist_uid,
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
				image: urlForKey(event.event.profile_image?.small.key)
			}}
		/>
	);
};

export default EventsSectionListItem;
