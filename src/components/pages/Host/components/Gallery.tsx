import { FindOneHostResponseDto } from '@flux/api/host/dto/host-find-one.dto';
import { ImageGallery } from '@organisms';
import React from 'react';

interface GalleryProps {
	hostData: FindOneHostResponseDto;
}

const Gallery: React.FC<GalleryProps> = ({ hostData }) => {
	return (
		<ImageGallery images={hostData.gallery.map((i) => i.media?.url || '')} />
	);
};

export default Gallery;
