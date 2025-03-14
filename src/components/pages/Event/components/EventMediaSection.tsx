import { Section } from '@atomic';
import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { EventMedia } from '@templates';
import React from 'react';

interface EventMediaSectionProps {
	eventData: FindOneEventResponseDto;
}

const EventMediaSection: React.FC<EventMediaSectionProps> = ({ eventData }) => {
	return (
		<Section marginBottom='none'>
			<EventMedia
				event_uid={eventData.event.event_uid}
				eventMedia={eventData.event.event_media}
			/>
		</Section>
	);
};

export default EventMediaSection;
