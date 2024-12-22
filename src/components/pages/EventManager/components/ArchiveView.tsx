import { View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useEventDateFormatter, useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import { orderBy } from 'lodash';
import React from 'react';

interface ArchiveViewProps {
	events?: EventLink[];
}

const ArchiveView: React.FC<ArchiveViewProps> = ({ events }) => {
	const { manageEventPage } = useNavigation();
	const sortedEvents = orderBy(events, ['event.start_time'], ['desc']);

	return (
		<View>
			{sortedEvents?.map((event) => {
				const dateFormatter = useEventDateFormatter(
					event.event.start_time,
					event.event.end_time
				);
				return (
					<ContentListItem
						key={event.event.event_uid}
						onPress={() => manageEventPage(event.event.event_uid)}
						titleTextProps={{
							title: event.event.name,
							bottomSubtext: dateFormatter.timeAgoConcise() || ''
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
			})}
		</View>
	);
};

export default ArchiveView;
