import { generateId } from '@etc';
import { GalleryItem as IGalleryItem } from '@flux/api/gallery/gallery-item.entity';
import { useMultimedia } from '@hooks';
import React, { useMemo } from 'react';
import GalleryItemContainer from '../components/GalleryItemContainer';
import GalleryItemThumbnailOverlay from '../overlays/GalleryItemThumbnailOverlay';

type GalleryItemProps = {
	galleryItem?: IGalleryItem | null;
};

const GalleryItem: React.FC<GalleryItemProps> = ({ galleryItem }) => {
	// const { viewGalleryPage } = useNavigation();
	const transitionTagId = useMemo(() => generateId(10), []);
	const { getImage } = useMultimedia();

	const onPress = () => {
		if (galleryItem !== null && transitionTagId !== undefined) {
			// viewGalleryPage(
			// 	transitionTagId,
			// 	index,
			// 	findGalleryParamsDto,
			// 	galleryRefType
			// );
		}
	};

	return (
		<GalleryItemContainer onPress={onPress}>
			<GalleryItemThumbnailOverlay
				image={getImage(galleryItem?.multimedia)}
				sharedTransitionTag={transitionTagId}
			/>
		</GalleryItemContainer>
	);
};

export default GalleryItem;
