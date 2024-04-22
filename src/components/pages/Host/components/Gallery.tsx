import { ImageGallery } from '@organisms';
import React from 'react';
import { useHostPageContext } from '../Host.context';

const Gallery = () => {
	const { hostData } = useHostPageContext();

	return (
		<ImageGallery images={hostData.gallery.map((i) => i.media?.url || '')} />
	);
};

export default Gallery;
