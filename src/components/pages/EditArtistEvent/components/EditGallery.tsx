import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { GalleryRefType } from '@flux/api/gallery/types';
import { EditableGallery } from '@organisms';
import React from 'react';

interface EditGalleryProps {
	eventData: FindOneArtistEventResponseDto;
}

const EditGallery: React.FC<EditGalleryProps> = ({ eventData }) => {
	return (
		<EditableGallery
			galleryRefType={GalleryRefType.artistEvent}
			findGalleryParamsDto={{
				refId: eventData.event.event_uid
			}}
		/>
	);
};

export default EditGallery;
