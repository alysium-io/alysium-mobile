import { Section } from '@atomic';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@organisms';
import { ContentType, EventStatus } from '@types';
import React from 'react';
import { useEventManagerPageContext } from '../EventManager.context';

const EventsListSection = () => {
	const { eventsData } = useEventManagerPageContext();
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
