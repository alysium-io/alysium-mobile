import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section } from '@atomic';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { GalleryRefType } from '@flux/api/gallery/types';
import { EditableGallery, Gallery } from '@organisms';
import React from 'react';

interface AssetsSectionProps {
	eventData: FindOneArtistEventResponseDto;
}

const AssetsSection: React.FC<AssetsSectionProps> = ({ eventData }) => {
	const { isEditable } = useArtistAppContext();
	return (
		<Section margin='m'>
			{isEditable ? (
				<EditableGallery
					gallery={eventData.event.gallery}
					galleryRefType={GalleryRefType.artistEvent}
					galleryRefUid={eventData.event.event_uid}
				/>
			) : (
				<Gallery
					gallery={eventData.event.gallery}
					galleryRefType={GalleryRefType.artistEvent}
					galleryRefUid={eventData.event.event_uid}
				/>
			)}
		</Section>
	);
};

export default AssetsSection;
