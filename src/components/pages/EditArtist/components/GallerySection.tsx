import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { GalleryRefType } from '@flux/api/gallery/types';
import { EditableGallery } from '@organisms';
import React from 'react';

const GallerySection = () => {
	const { artistData } = useArtistAppContext();

	return (
		<EditableGallery
			galleryRefType={GalleryRefType.artist}
			findGalleryParamsDto={{
				refId: artistData.artist_uid
			}}
		/>
	);
};

export default GallerySection;
