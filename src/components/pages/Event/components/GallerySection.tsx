import { Section } from '@atomic';
import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { Gallery } from '@organisms';
import React from 'react';

interface GallerySectionProps {
	eventData: FindOneEventResponseDto;
}

const GallerySection: React.FC<GallerySectionProps> = ({ eventData }) => {
	return (
		<Section marginBottom='none'>
			<Gallery gallery={eventData.event.gallery} />
		</Section>
	);
};

export default GallerySection;
