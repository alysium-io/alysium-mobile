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
				findGalleryParamsDto={{
					refId: eventData.event.event_uid
				}}
			/>
		</Section>
	);
};

export default GallerySection;
