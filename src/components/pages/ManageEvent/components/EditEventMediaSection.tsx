import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { EditEventMedia } from '@templates';
import React from 'react';

interface EditEventMediaSectionProps {
	event: EventLink;
}

const EditEventMediaSection: React.FC<EditEventMediaSectionProps> = ({
	event
}) => {
	const { isEditable } = useArtistAppContext();
	if (!isEditable) return null;
	return (
		<Section margin='m'>
			<EditEventMedia
				event_uid={event.event.event_uid}
				event_media={event.event.event_media}
			/>
		</Section>
	);
};

export default EditEventMediaSection;
