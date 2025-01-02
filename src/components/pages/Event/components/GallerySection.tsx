import { Section } from '@atomic';
import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { GalleryRefType } from '@flux/api/gallery/types';
import { Gallery } from '@organisms';
import React from 'react';

interface GallerySectionProps {
	eventData: FindOneEventResponseDto;
}

const GallerySection: React.FC<GallerySectionProps> = ({ eventData }) => {
	return (
		<Section marginBottom='none'>
			<Gallery
				galleryRefType={GalleryRefType.artistEvent}
				galleryRefUid={eventData.event.event_uid}
				gallery={eventData.event.gallery}
			/>
		</Section>
	);
};

export default GallerySection;
