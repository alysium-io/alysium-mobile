import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useEvent, useNavigation } from '@hooks';
import { EventContentListItem } from '@molecules';
import dayjs from 'dayjs';
import React from 'react';

const EventListItem: React.FC<{ event: EventLink }> = ({ event }) => {
	const { manageEventPage } = useNavigation();
	const { isLive } = useEvent(event.event);
	const startTime = dayjs(event.event.start_time);

	const getBottomSubtext = () => {
		if (isLive) {
			return 'Live';
		}

		return startTime && startTime.isValid() ? startTime.fromNow() : undefined;
	};

	return (
		<EventContentListItem
			onPress={() => manageEventPage(event.event.event_uid)}
			titleTextProps={{
				title: event.event.name,
				bottomSubtext: getBottomSubtext(),
				topSubtext: event.artist.name,
				topSubtextColor: 'text.q'
			}}
			profileImageProps={{
				image: event.event.profile_image?.small.key
			}}
		/>
	);
};

export default EventListItem;
