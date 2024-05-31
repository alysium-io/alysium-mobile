import { FindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { ImageGallery } from '@organisms';
import React from 'react';

interface GalleryProps {
	artistData: FindOneArtistResponseDto;
}

const Gallery: React.FC<GalleryProps> = ({ artistData }) => {
	return (
		<ImageGallery images={artistData.gallery.map((i) => i.media?.url || '')} />
	);
};

export default Gallery;
