import { Section } from '@atomic';
import { FindAllEventsResponseDto } from '@flux/api/event/dto/event-find-all.dto';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@organisms';
import { ContentType, EventStatus } from '@types';
import React from 'react';

interface EventsListSectionProps {
	eventsData: FindAllEventsResponseDto[];
}

const EventsListSection: React.FC<EventsListSectionProps> = ({
	eventsData
}) => {
	const { editEventPage } = useNavigation();

	return (
		<Section>
			{eventsData.map((event) => (
				<ContentListItem
					key={event.event_id}
					title={event.name}
					subtitle={EventStatus.draft}
					onPress={() => editEventPage(event.event_id)}
					contentType={ContentType.event}
					image={event.profile_image?.url || ''}
					borderRadius='sharp'
					border
				/>
			))}
		</Section>
	);
};

export default EventsListSection;
