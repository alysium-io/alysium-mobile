import { EventLink } from '@flux/api/event-link/event-link.entity';
import {
	useDatetimeCountdown,
	useEventDateFormatter,
	useNavigation
} from '@hooks';
import { ContentListItem } from '@molecules';
import React from 'react';

const EventListItem: React.FC<{ event: EventLink }> = ({ event }) => {
	const { manageEventPage } = useNavigation();
	const dateFormatter = useEventDateFormatter(
		event.event.start_time,
		event.event.end_time
	);

	const { countdown } = useDatetimeCountdown(
		event.event.start_time ?? undefined
	);

	const getSubtext = () => {
		if (!dateFormatter.hasValidDate) return 'No date';
		// If the event is today, show the countdown
		if (dateFormatter.isToday) {
			if (countdown) return 'Today, ' + countdown;
			return 'Live';
		}

		if (dateFormatter.isInFuture)
			return dateFormatter.semantic() + ', ' + dateFormatter.startDate();
		if (dateFormatter.isInPast) return dateFormatter.timeAgoConcise();
		return 'No date';
	};

	return (
		<ContentListItem
			onPress={() => manageEventPage(event.event.event_uid)}
			titleTextProps={{
				title: event.event.name,
				bottomSubtext: getSubtext() || undefined
			}}
			profileImageProps={{
				image: event.event.profile_image?.small.key,
				borderRadius: 'none',
				defaultImageProps: {
					icon: 'event'
				}
			}}
		/>
	);
};

export default EventListItem;
