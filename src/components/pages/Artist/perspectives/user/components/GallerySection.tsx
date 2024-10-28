import { Section } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { FindGalleryResponseDto } from '@flux/api/gallery/dto/gallery-find.dto';
import { MediaRefType } from '@flux/api/media/types';
import { Gallery } from '@organisms';
import React from 'react';

interface GallerySectionProps {
	galleryData?: FindGalleryResponseDto;
	artistData: PublicFindOneArtistResponseDto;
}

const GallerySection: React.FC<GallerySectionProps> = ({
	galleryData,
	artistData
}) => {
	if (!galleryData) {
		return null;
	}

	return (
		<Section>
			<Gallery
				gallery={galleryData}
				findGalleryParamsDto={{
					refType: MediaRefType.artist,
					refId: artistData.artist_uid
				}}
			/>
		</Section>
	);
};

export default GallerySection;
