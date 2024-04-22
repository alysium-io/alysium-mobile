import { ImageGallery } from '@organisms';
import React from 'react';
import { useArtistPageContext } from '../Artist.context';

const Gallery = () => {
	const { artistData } = useArtistPageContext();

	return (
		<ImageGallery images={artistData.gallery.map((i) => i.media?.url || '')} />
	);
};

export default Gallery;
