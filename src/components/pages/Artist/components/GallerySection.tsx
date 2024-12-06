import { Section } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { GalleryRefType } from '@flux/api/gallery/types';
import { Gallery } from '@organisms';
import React from 'react';

interface GallerySectionProps {
	artistData: PublicFindOneArtistResponseDto;
}

const GallerySection: React.FC<GallerySectionProps> = ({ artistData }) => {
	return (
		<Section marginBottom='none'>
			<Gallery
				gallery={artistData.gallery}
				galleryRefType={GalleryRefType.artist}
				galleryRefUid={artistData.artist_uid}
			/>
		</Section>
	);
};

export default GallerySection;
