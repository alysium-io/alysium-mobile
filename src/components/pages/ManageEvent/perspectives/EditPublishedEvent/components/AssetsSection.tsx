import { Section } from '@atomic';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { GalleryRefType } from '@flux/api/gallery/types';
import { EditableGallery } from '@organisms';
import React from 'react';

interface AssetsSectionProps {
	eventData: FindOneArtistEventResponseDto;
}

const AssetsSection: React.FC<AssetsSectionProps> = ({ eventData }) => {
	return (
		<Section margin='m'>
			<EditableGallery
				gallery={eventData.event.gallery}
				galleryRefType={GalleryRefType.artistEvent}
				galleryRefUid={eventData.event.event_uid}
			/>
		</Section>
	);
};

export default AssetsSection;
