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
			findGalleryParamsDto={{
				refId: eventData.event.event_uid
			}}
			galleryRefType={GalleryRefType.artistEvent}
		/>
	);
};

export default EditGallery;
