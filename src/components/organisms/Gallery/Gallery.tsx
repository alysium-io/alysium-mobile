import { DynamicGrid } from '@atomic';
import { generateId } from '@etc';
import { Gallery as IGallery } from '@flux/api/gallery/gallery.entity';
import { GalleryRefType } from '@flux/api/gallery/types';
import { useMultimedia, useNavigation } from '@hooks';
import { NanoId } from '@types';
import React, { useMemo } from 'react';
import GalleryItemContainer from './components/GalleryItemContainer';
import GalleryItemThumbnailOverlay from './overlays/GalleryItemThumbnailOverlay';

interface GalleryProps {
	gallery: IGallery | null;
	galleryRefType: GalleryRefType;
	galleryRefUid: NanoId;
}

const Gallery: React.FC<GalleryProps> = ({
	gallery,
	galleryRefType,
	galleryRefUid
}) => {
	const { getImage } = useMultimedia();
	const { viewGalleryPage } = useNavigation();

	return (
		<DynamicGrid
			data={gallery?.items ?? []}
			renderItem={({ item, index }) => {
				const transitionTagId = useMemo(() => generateId(10), []);
				return (
					<GalleryItemContainer
						onPress={() => {
							viewGalleryPage(
								transitionTagId,
								index,
								{ refId: galleryRefUid },
								galleryRefType
							);
						}}
					>
						<GalleryItemThumbnailOverlay
							image={getImage(item?.multimedia)}
							sharedTransitionTag={transitionTagId}
						/>
					</GalleryItemContainer>
				);
			}}
		/>
	);
};

export default Gallery;
