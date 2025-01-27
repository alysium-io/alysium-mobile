import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { GalleryRefType } from '@flux/api/gallery/types';
import { EditableGallery, Gallery } from '@organisms';
import React from 'react';

interface EditEventGalleryProps {
	event: EventLink;
}

const EditEventGallery: React.FC<EditEventGalleryProps> = ({ event }) => {
	const { isEditable } = useArtistAppContext();
	return (
		<Section margin='m'>
			{isEditable ? (
				<EditableGallery
					gallery={event.event.gallery}
					galleryRefType={GalleryRefType.artistEvent}
					galleryRefUid={event.event.event_uid}
				/>
			) : (
				<Gallery
					gallery={event.event.gallery}
					galleryRefType={GalleryRefType.artistEvent}
					galleryRefUid={event.event.event_uid}
				/>
			)}
		</Section>
	);
};

export default EditEventGallery;
