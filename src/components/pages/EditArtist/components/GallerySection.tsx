import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { galleryApiSlice } from '@flux/api/gallery';
import { FindGalleryParamsDto } from '@flux/api/gallery/dto/gallery-find.dto';
import { MediaRefType } from '@flux/api/media/types';
import { EditableGallery } from '@organisms';
import React from 'react';

const GallerySection = () => {
	const { artistData } = useArtistAppContext();
	const findGalleryParamsDto: FindGalleryParamsDto = {
		refType: MediaRefType.artist,
		refId: artistData.artist_uid
	};
	const { data } = galleryApiSlice.useFindGalleryQuery({
		params: findGalleryParamsDto
	});

	return (
		<EditableGallery
			gallery={data}
			findGalleryParamsDto={findGalleryParamsDto}
		/>
	);
};

export default GallerySection;
